import React, { useState,useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { Form, Input, Modal, Select, Table, message, DatePicker } from 'antd'
import axios from 'axios'
import Spinner from '../components/Spinner'
import moment from 'moment'
import {UnorderedListOutlined, AreaChartOutlined} from '@ant-design/icons'
import Analytics from '../components/Analytics'

const {RangePicker} = DatePicker;

const HomePage =() => {

  const [showModal,setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [transactions, setTransactions] = useState([])

  const [frequency, setFrequency] = useState('1')

  const [selectedDate, setSelectedDate] = useState([]);

  const [type, setType] = useState("all");

  const [viewData, setViewData] = useState('table')

// Handle add transaction form submit
  const handleSubmit = async(values) =>{
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user)
    setLoading(true)
    try{
    await axios.post('/transaction/add-transaction', {...values, userId: user._id})
    setLoading(false);
    message.success('Transaction added successfully')
    setShowModal(false);
    getAllTransactions()
    }
    catch(error){
      setShowModal(false);
      setLoading(false);
      message.error('Failed to add transaction')
    }
  }

  // get all transactions
  const getAllTransactions = () =>{
    try{
      const user = JSON.parse(localStorage.getItem("user"))

      setLoading(true);
      const res = axios.post("/transaction/get-transactions",
      { 
        userId: user._id,
        freq: frequency,
        selectedDate: selectedDate,
        expenseType: type
      });
      setLoading(false);

      res.then(response => {
        setTransactions(response.data);
        console.log(transactions)
    });
    
    }
    catch(error){

    }
  }

  // Table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
      title: "Amount",
      dataIndex: "amount"
    },
    {
      title: "Type",
      dataIndex: "type"
    },
    {
      title: "Category",
      dataIndex: "category"
    },
    {
      title: "Reference",
      dataIndex: "reference"
    },
    {
      title: "Actions"
    }
  ]

  useEffect(()=>{
    getAllTransactions();
  },[frequency, selectedDate, type])

  return (
    // the content inside Layout will be treated as children for Layout.js file
    
    <Layout>  
      { loading && <Spinner/>}
         <div className='filters'>
          <div>
            {/* Date frequency filter */}
            <h6> Select frequency</h6>
            <Select value={frequency} onChange={(values) => setFrequency(values)}>
              <Select.Option value="1">Today</Select.Option>
              <Select.Option value="7">Last 1 week</Select.Option>
              <Select.Option value="30">Last 1 month</Select.Option>
              <Select.Option value="180">Last 3 months</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
            {frequency == "custom" && <RangePicker value={selectedDate} onChange={(values) =>{
              setSelectedDate(values);
            }} />}
          </div>

          {/* Type filter */}
          <div>
          <h6> Select Type</h6>
            <Select value={type} onChange={(values) => setType(values)}>           
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="Income">INCOME</Select.Option>
              <Select.Option value="Expense">EXPENSE</Select.Option>
            </Select>
          </div>
          <div className="switch-icons">
              <UnorderedListOutlined className={`mx-2 ${viewData == 'table' ? 'active-icon': 'inactive-icon'}`} onClick = {() => setViewData('table')}/>
              <AreaChartOutlined className={`mx-2 ${viewData == 'analytics' ? 'active-icon': 'inactive-icon'}` } onClick = {() => setViewData('analytics')}/>
            </div>
          <div>
            <button className="btn btn-primary" onClick={()=>setShowModal(true)}> Add New</button>
          </div>
         </div>

        {/* Display all expenses in the form of tables*/}
         <div className='content'>
          {viewData == 'table' && <Table columns={columns} dataSource={transactions}/> }
          {viewData == 'analytics' && <Analytics transactions={transactions}/>}
         </div>

          {/* Display pop-up form for adding expense */}
         <Modal title="Add Transaction" open={showModal} onCancel={()=>{setShowModal(false)}} footer={false}>
          <Form layout='vertical' onFinish={handleSubmit}>
            {/* in forms name should be same as that of in Schema model */}
            <Form.Item label="Amount" name="amount">
              <Input type='number'/>
            </Form.Item>
            <Form.Item label="Type" name="type">
              <Select>
               <Select.Option value="Income">Income</Select.Option>
                <Select.Option value="Expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Category" name="category">
              <Select>
               <Select.Option value="Salary">Salary</Select.Option>
                <Select.Option value="Tip">Tip</Select.Option>
                <Select.Option value="Project">Project</Select.Option>
                <Select.Option value="Food">Food</Select.Option>
                <Select.Option value="Bills">Bills</Select.Option>
                <Select.Option value="Medicine">Medicine</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Date" name="date">
              <Input type="date" />
            </Form.Item>
            <Form.Item label="Reference" name="reference">
              <Input type='text'/>
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input type='text'/>
            </Form.Item>

            <div className='d-flex justify-content-end'>
              <button type='submit' className='btn btn-primary'>Submit</button>
            </div>
          </Form>
         </Modal>
    </Layout>
  )
}

export default HomePage