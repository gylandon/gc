import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import style from './index.less';
import { DatePicker, Select } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import { connect, useSelector, useDispatch } from 'react-redux';
import { processing as processingApi } from '@actions';
import { processing } from '@api';
const { TextArea } = Input;

const dateFormat = 'DD/MM/YYYY';
const Option = Select.Option;

const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  selectable,
  category,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async (e) => {
    try {
      const values = await form.validateFields();
      console.log('hehe', values);
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  const handleCategory = async (value) => {
    try {
      const values = await form.validateFields();
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  if (selectable) {
    console.log('testsyw', record[dataIndex]);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
    childNode = (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
      >
        <Select style={{ width: 120 }} onChange={(e) => handleCategory(e)}>
          {category.map((value) => {
            return (
              <Option key={value} value={value}>
                {value}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const EditableTable = (props) => {
  const dispatch = useDispatch();
  const dataSource = useSelector(
    (state) => state.processing.processingCollection.data || []
  );

  const [count, setCount] = useState(0);

  const columns = [
    {
      title: 'Catergory',
      dataIndex: 'materialCategory',
      width: '30%',
      selectable: true,
      category: props.category,
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      editable: true,
    },
    {
      title: 'Comment',
      dataIndex: 'comments',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const computeWeights = (newDataSource) => {
    console.log('nono', newDataSource);
    const weights = newDataSource.reduce((pre, cur) => {
      const curW = Number(cur.weight) ? Number(cur.weight) : 0;
      return pre + curW;
    }, 0);
    props.setWeights(weights);
  };

  const handleDelete = (key) => {
    const newDataSource = [...dataSource];
    computeWeights(newDataSource.filter((item) => item.key !== key));
    dispatch(
      processingApi.processCollection(
        newDataSource.filter((item) => item.key !== key)
      )
    );
  };

  const handleAdd = () => {
    console.log('check', props.category[0]);
    const newData = {
      key: count,
      materialCategory: props.category[0],
      weight: `0`,
      comments: `no comments`,
    };
    setCount(count + 1);
    dispatch(processingApi.processCollection([...dataSource, newData]));
  };

  const handleSave = (row) => {
    const newDataSource = [...dataSource];
    const index = newDataSource.findIndex((item) => row.key === item.key);
    const item = newDataSource[index];
    newDataSource.splice(index, 1, { ...item, ...row });
    console.log('newDataSource', newDataSource);
    computeWeights(newDataSource);
    dispatch(processingApi.processCollection(newDataSource));
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columnsProps = columns.map((col) => {
    if (!col.editable && !col.selectable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        selectable: col.selectable,
        dataIndex: col.dataIndex,
        title: col.title,
        category: props.category,
        handleSave: handleSave,
      }),
    };
  });

  return (
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
      </Button>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columnsProps}
      />
    </div>
  );
};

export const ProcessingFormComponent = (props) => {
  console.log('test', props);
  const collection = useSelector((state) => state.processing.currentCollection);
  let collectionData = {};
  if (collection.data) {
    collectionData = collection.data;
  }
  console.log('test1', collectionData);
  const colDefs = [
    {
      headerName: 'Container Type',
      field: 'containerType',
      width: 300,
      headerTooltip: 'The type of container',
    },
    {
      headerName: 'Quantity',
      field: 'quantity',
      headerTooltip: 'the quantity of container',
      filter: 'agNumberColumnFilter',
    },
    {
      headerName: 'Content',
      field: 'content',
      headerTooltip: 'the content of container',
      filter: 'agNumberColumnFilter',
      suppressSizeToFit: true,
    },
  ];

  const DEFAULT_COL_DEF = {
    flex: 1,
    sortable: true,
    resizable: true,
    filterParams: {
      buttons: ['reset'],
      debounceMs: 200,
    },
  };
  let data = collectionData.containers || [];
  data = data.map((d) => {
    return {
      ...d,
      content: d.content || '-',
    };
  });
  // const data = [
  //   {
  //     containerType: 'cages',
  //     weights: collectionData['cages'],
  //   },
  //   {
  //     containerType: 'bags',
  //     weights: collectionData['bags'],
  //   },
  //   {
  //     containerType: 'boxes',
  //     weights: collectionData['boxes'],
  //   },
  //   {
  //     containerType: 'bins',
  //     weights: collectionData['bins'],
  //   },
  // ];

  const [gridApi, setGridApi] = useState(null);
  const [weights, setWeights] = useState(0);
  const [category, setCategory] = useState(['Media']);
  const [serviceType, setServiceType] = useState([]);

  const onGridReady = useCallback((params) => {
    console.log(params);
    if (params) {
      setGridApi(params.api);
      params.api.sizeColumnsToFit();
    }
  }, []);

  useEffect(() => {
    processing.getCategory().then((res) => {
      console.log(res);
      if (res.data.code === 200) {
        const _category = res.data.data.map((_, idx) => {
          return _.categoryName;
        });
        setCategory(_category);
      }
    });
    processing.getService().then((res) => {
      console.log(res);
      if (res.data.code === 200) {
        const _serviceType = res.data.data.map((_, idx) => {
          return _;
        });
        setServiceType(_serviceType);
      }
    });
  }, []);

  return (
    <div id={style['processing-form-wrapper']}>
      <div className={style['processing-form-overview']}>
        <div className={style['processing-form-basic']}>
          <span>
            <div>Service ID</div>
            <Input disabled value={collectionData.dataId || ''}></Input>
          </span>

          <span>
            <div>Collection Date</div>
            <Input disabled value={collectionData.date || ''}></Input>
          </span>

          <span>
            <div>Customer Name</div>
            <Input disabled value={collectionData.customerName || ''}></Input>
          </span>

          <span>
            <div>Customer Site Name</div>
            <Input disabled value={collectionData.siteName || ''}></Input>
          </span>

          <span>
            <div>Driver</div>
            <Input disabled value={collectionData.driverName || ''}></Input>
          </span>
        </div>
        <div className={style['processing-form-note']}>
          <div>Note</div>
          <TextArea disabled value={collectionData.notes || ''}></TextArea>
        </div>
      </div>
      <div style={{ fontSize: '16px', padding: '4px' }}>
        Collection details: (Weights: {collectionData.collectionWeight})
      </div>
      <div
        className={'ag-theme-alpine ' + style['processing-form-container']}
        style={{ height: '200px', width: '100%' }}
      >
        <AgGridReact
          defaultColDefs={DEFAULT_COL_DEF}
          columnDefs={colDefs}
          rowData={data}
          onGridReady={onGridReady}
        />
      </div>
      <hr />
      <div>
        <h1 style={{ marginBottom: '3px' }}>Processd Items</h1>
        <div className={style['processing-form-check-header']}>
          {/* <div>
            Processing Date
            <DatePicker
              style={{ marginLeft: '10px' }}
              defaultValue={moment()}
              format={dateFormat}
            />
          </div> */}
          {/* <div>
            Processing Staff
            <Input></Input>
          </div> */}
        </div>
        <div className={style['processing-form-check-header']}>
          <div style={{ fontSize: '20px' }}>
            Total Weights: {weights}
            {collectionData.collectionWeight > weights
              ? ` (Insufficient weight, ${
                  collectionData.collectionWeight - weights
                } Weight to be added) `
              : collectionData.collectionWeight < weights
              ? ` (Overloaded weight, ${
                  weights - collectionData.collectionWeight
                } to be removed) `
              : ` (Balanced weight, Well Done!) `}
          </div>
          {/* <div style={{ display: 'flex', fontSize: '20px' }}>
            <span>Service Type: </span>
            <Select
              style={{ width: '400px' }}
              value={props.selectType}
              onChange={(v) => {
                props.changeSelectType(v);
              }}
            >
              {serviceType.map((type, idx) => {
                return (
                  <Option value={type.dataId} key={type.dataId}>
                    {type.categoryName}
                  </Option>
                );
              })}
            </Select>
          </div> */}
        </div>
        <EditableTable setWeights={setWeights} category={category} />
      </div>
    </div>
  );
};
