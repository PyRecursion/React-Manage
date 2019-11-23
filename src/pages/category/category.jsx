import React, { Component } from 'react'
import { Card, Icon, Button, Table, message, Modal } from 'antd'
import LinkButton from '../../components/link-button';
import { reqCategorys, reqAddCategory, reqUpdateCategory } from '../../api';
import AddUpdateForm from './add-update-form';


export default class Category extends Component {
    state = {
        categorys: [],
        loading: false,
        showStatus: 0,//0不显示，1显示添加，2 显示修改
    }

    /*
    初始化table的所有列信息数组
    */
    initColumns = () => {
        this.columns = [
            {
                title: '分类',
                dataIndex: 'name',
            },
            {
                title: '操作',
                width: 300,
                className: 'crud',
                render: (category) => <LinkButton onClick={
                    () => {
                        this.category = category 
                        this.setState({ showStatus: 2 })
                    }
                }>修改分类
                </LinkButton>,
            },
        ];
    }
    getcategorys = async () => {
        this.setState({ loading: true })
        const result = await reqCategorys()
        this.setState({ loading: false })
        if (result.status === 0) {
            const categorys = result.data
            this.setState({
                categorys
            })
        } else {
            message.error('获取分类列表失败')
        }
    }

    /*
    添加、修改分类
    */
    handleOk = () => {
        //进行表单验证
        this.form.validateFields(async (err, values) => {
            //验证通过后，得到输入数据

            if (!err) {
                this.form.resetFields() //重置输入数据
                const { categoryName } = values
                const {showStatus}=this.state
                //发添加分类请求
                let result
                if (showStatus===1){
                    result=await reqAddCategory(categoryName)
                }else{
                    const categoryId=this.category._id
                    result=await reqUpdateCategory({categoryId,categoryName})
                }
                this.setState({showStatus: 0,})

                if (result.status === 0) {
                    //重新获取分类列表显示
                    this.getcategorys()
                    message.success('操作成功')
                } else {
                    message.error('操作失败')
                }
            }
        });
    }

    handleCancel = () => {
        this.form.resetFields()
        this.setState({
            showStatus: 0
        })
    }

    componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getcategorys()
    }
    render() {
        const { categorys, loading, showStatus } = this.state
        const category=this.category||{} 
        const extra = (
            <Button type="primary"  onClick={() =>{
            this.category={};
            this.setState({ showStatus: 1 })}}>
                添加
                <Icon type='plus'></Icon>
            </Button>
        )
        return (
            <Card extra={extra}>
                <Table
                    columns={this.columns}
                    rowKey="_id"
                    loading={loading}
                    dataSource={categorys}
                    bordered={true}
                    pagination={{ defaultPageSize: 3, showQuickJumper: true }}
                />,
                <Modal
                    title={showStatus === 1 ? "添加分类" : "修改分类"}
                    visible={showStatus !== 0}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {/*将子组件传过来的form保存到当前属性*/}
                    <AddUpdateForm setForm={form => this.form = form} categoryName={category.name} />
                </Modal>
            </Card>
        )
    }
}
