import moment from 'moment'
import React, { useEffect, useState } from 'react'

const Todo = () => {

    const getData = () => {
        let list = localStorage.getItem("list")
        if (list) {
            return JSON.parse(list)
        }
        else {
            return []
        }
    }
    const getComData = () => {
        let list = localStorage.getItem("completeList")
        if (list) {
            return JSON.parse(list)
        }
        else return []
    }
    const [input, setInput] = useState("")
    const [items, setItems] = useState(getData())
    const [completedTask, setCompletedTask] = useState(getComData())
    const [edit, setEdit] = useState(false)
    const [editItemId, setEditItemId] = useState(null)

    const addItem = (e, id) => {
        e.preventDefault()
        if (input === "") {
            alert("please Enter some task")
        }
        else if (input && edit) {
            setItems(
                items.map((item) => {
                    if (item.id === editItemId) {
                        return { ...item, input: input, updateDate: `Update at - ${moment().format('MMMM Do YYYY, h:mm:ss a')}`, }
                    }
                    return item
                })
            )
            setEditItemId(null)
            setEdit(false)
            setInput("")
        }
        else {
            setInput("")
            setItems([...items, { input, date: `Added at - ${moment().format('MMMM Do YYYY, h:mm:ss a')}`, id: new Date().getTime().toString() }])
        }
    }
    const removeAll = () => {
        setCompletedTask([])
    }
    const deleteItem = (id) => {
        const updateList = items.filter((item) => {
            return item.id !== id
        })
        setItems(updateList)
    }

    const comdelete = (id) => {
        const updateList = completedTask.filter((item, index) => {
            return item.id !== id
        })
        setCompletedTask(updateList)
    }
    const ComTask = (id) => {
        const comItem = items.find((item) => {
            return item.id === id
        })
        setCompletedTask([...completedTask, { ...comItem, completeDate: `Completed at - ${moment().format('MMMM Do YYYY, h:mm:ss a')}` }])

        const updateList = items.filter((item) => {
            return item.id !== id
        })
        setItems(updateList)
    }

    const editItem = (id) => {
        const selectItem = items.find((item) => {
            return item.id === id
        })
        setInput(selectItem.input)
        setEdit(true)
        setEditItemId(selectItem.id)
    }

    useEffect(() => {
        localStorageFunction()
        localStorageCompFuntion()
    }, [items, completedTask])

    const localStorageFunction = () => {
        return localStorage.setItem("list", JSON.stringify(items))

    }
    const localStorageCompFuntion = () => {
        return localStorage.setItem("completeList", JSON.stringify(completedTask))

    }
    return (
        <div className="container">
            <h1>ADD SOME TO DO</h1>
            <form className="form">
                <div className="inputDiv">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        required
                        type="text"
                        placeholder="Type Somthing Here"
                        className="input"
                    />
                    {
                        edit ? <button
                            style={{
                                cursor: "pointer"
                            }}
                            className="btn"
                            onClick={addItem}
                            type="submit"
                        >
                            <i className="fa-solid fa-edit"></i>
                        </button> :
                            <button style={{
                                cursor: "pointer"
                            }} className="btn" onClick={addItem} type="submit">
                                <i className="fa-solid fa-plus"></i>
                            </button>
                    }



                </div>
            </form>

            {
                items.length == 0 ? <p style={{
                    color: 'white'
                }}>NO Data Availible</p> :
                    <div className="record">
                        {

                            items.map((item, i) => {
                                return (
                                    <div key={i} className="each-record">
                                        <div className="info">
                                            <h3>{item.input}</h3>
                                            <div className="icons">
                                                <i style={{
                                                    cursor: "pointer"
                                                }} onClick={() => deleteItem(item.id)}
                                                    className="fa-solid fa-trash"
                                                ></i>
                                                <i style={{
                                                    cursor: "pointer"
                                                }} onClick={() => editItem(item.id)}
                                                    className="fa-solid fa-edit"
                                                ></i>
                                                <i style={{
                                                    cursor: "pointer"
                                                }} onClick={() => ComTask(item.id)} className="fa-solid fa-check"></i>
                                            </div>
                                        </div>
                                        <div className="update">
                                            <p>{item.date}</p>
                                            <p style={{
                                                marginTop: "10px"
                                            }}>{item.updateDate ? item.updateDate : null}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
            }
            {
                completedTask.length == 0 ? "" : <>

                    <div className="complete-task">
                        <h2>Completed Tasks</h2>
                        <div className="record">
                            {
                                completedTask.map((item, i) => {
                                    return (
                                        <div key={i} className="each-record">
                                            <div className="info">
                                                <h3>{item.input}</h3>
                                                <div className="icons">
                                                    <i style={{
                                                        cursor: "pointer"
                                                    }}
                                                        onClick={() => comdelete(item.id)} className="fa-solid fa-trash"
                                                    ></i>
                                                </div>
                                            </div>
                                            <div className="update">
                                                <p>{item.completeDate ? item.completeDate : null}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <button
                        className="button"
                    >
                        <span onClick={removeAll} className="button-text">Romove All</span>
                        <div className="fill-container"></div>
                    </button>
                </>
            }
        </div>
    )
}

export default Todo