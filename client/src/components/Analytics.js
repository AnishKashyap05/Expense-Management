import { Progress } from 'antd'
import React from 'react'

const Analytics = ({ transactions }) => {
    // Total transactions
    const totalTransaction = transactions.length
    const totalIncomeTransactions = transactions.filter(transaction => transaction.type === 'Income')
    const totalExpenseTransactions = transactions.filter(transaction => transaction.type === 'Expense')

    const totalIncomePercentage = (totalIncomeTransactions.length / totalTransaction) * 100
    const totalExpensePercentage = (totalExpenseTransactions.length / totalTransaction) * 100


    //Total turnovers
    const totalTurnOvers = transactions.reduce(
        (acc, transaction) => acc + transaction.amount,
        0
    );

    const categories = ['Salary', "Tip", "Project", "Medicine","Food","Bills"]

    const totalIncomeTurnOver = transactions.filter(
        (transaction) => transaction.type == "Income")
        .reduce((acc, transaction) => acc + transaction.amount, 0
        );

    const totalExpenseTurnOver = transactions.filter(
        (transaction) => transaction.type == "Expense")
        .reduce((acc, transaction) => acc + transaction.amount, 0
        );

    const totalIncomeTurnOverPercentage = (totalIncomePercentage / totalTurnOvers) * 100

    const totalExpenseTurnOverPercentage = (totalExpensePercentage / totalTurnOvers) * 100


    return (
        <>
            <div className='row'>

                <div className='col-md-4'>
                    <div className='card'>
                        <div className='card-header'>
                            Total Transactions: {totalTransaction}
                        </div>
                        <div className='card-body'>
                            <h5 className='text-success'>Income transactions: {totalIncomeTransactions.length}</h5>
                            <h5 className='text-danger'>Expense transactions: {totalExpenseTransactions.length}</h5>
                            <div>
                                <Progress type='circle' strokeColor={'green'} className='mx-2' percent={totalIncomePercentage.toFixed(0)} />
                                <Progress type='circle' strokeColor={'red'} className='mx-2' percent={totalExpensePercentage.toFixed(0)} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-md-4'>
                    <div className='card'>
                        <div className='card-header'>
                            Total Turn Over: {totalTurnOvers}
                        </div>
                        <div className='card-body'>
                            <h5 className='text-success'>Income Turnover: {totalIncomeTurnOver}</h5>
                            <h5 className='text-danger'>Expense Turnover: {totalExpenseTurnOver}</h5>
                            <div>
                                <Progress type='circle' strokeColor={'green'} className='mx-2' percent={totalIncomeTurnOverPercentage.toFixed(0)} />
                                <Progress type='circle' strokeColor={'red'} className='mx-2' percent={totalExpenseTurnOverPercentage.toFixed(0)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Analytics