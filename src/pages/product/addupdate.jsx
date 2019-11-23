import React, { Component } from 'react'

import {
    Card,
    Icon,
    Form,
    Input,
    Button,
    Select,
    message
} from 'antd'
import LinkButton from '../../components/link-button'
import memoryUtils from '../../utils/memoryUtils'
import { reqCategorys, reqAddUpdateProduct } from '../../api'
import PicturesWall from './pictures-wall'
import RichTextEditor from './rich-text-editor'


const Item = Form.Item
const Option = Select.Option



class AddUpdate extends Component {
    state = {
        categorys: []

    }

    constructor(props) {
        super(props);
        // 创建ref容器, 并保存到组件对象
        this.pwRef = React.createRef()
        this.editorRef = React.createRef()

    }

    getCategorys = async () => {
        const result = await reqCategorys()
        if (result.status === 0) {
            const categorys = result.data
            this.setState({ categorys })
        }
    }

    componentWillMount() {
        const product = memoryUtils.product
        this.product = product
        this.isUpdate = !!product._id

    }

    componentDidMount() {
        this.getCategorys()
    }

    /*对价格自定义验证*/

    validatePrice = (rule, value, callback) => {
        if (value === '') {
            callback()
        } else if (value * 1 <= 0) {
            callback('价格必须大于0')
        } else {
            callback()
        }
    }
    handleSubmit = e => {
        //阻止时间的默认行为
        e.preventDefault();
        //进行统一的表单验证
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const { name, desc, price, categoryId } = values
                // 收集上传的图片文件名的数组  父组件获取子组件的属性
                const imgs = this.pwRef.current.getImgs()
                console.log(name, desc, price, categoryId)
                console.log('imgs', imgs)
                const detail = this.editorRef.current.getDetail()
                console.log('detail', detail)
                // 封装product对象
                const product = { name, desc, price, categoryId, imgs, detail }
                if (this.isUpdate) {
                    product._id = this.product._id
                }

                // 发请求添加或修改
                const result = await reqAddUpdateProduct(product)
                if (result.status === 0) {
                    message.success(`${this.isUpdate ? '修改' : '添加'}商品成功`)
                    this.props.history.replace('/product')
                } else {
                    message.error(result.msg)
                }
            }
        });

    };


    render() {
        const { categorys } = this.state
        const { getFieldDecorator } = this.props.form;
        const { isUpdate, product } = this

        const title = (
            <span>
                <LinkButton onClick={() => { this.props.history.goBack() }}>
                    <Icon type='arrow-left' />
                </LinkButton>
                <span>{isUpdate ? '修改商品' : '添加商品'}</span>
            </span>
        )

        const formLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 }
        }


        return (
            <Card title={title} >
                <Form {...formLayout} onSubmit={this.handleSubmit}>
                    <Item label="商品名称">
                        {getFieldDecorator('name', {
                            initialValue: product.name,
                            rules: [
                                { required: true, message: '必须输入商品名称!' }
                            ],
                        })(<Input placeholder="商品名称" />)}
                    </Item>
                    <Item label="商品描述">
                        {getFieldDecorator('desc', {
                            initialValue: product.desc,
                            rules: [
                                { required: true, message: '必须输入商品描述!' }
                            ],
                        })(<Input placeholder="商品描述" />)}
                    </Item>
                    <Item label="商品价格">
                        {getFieldDecorator('price', {
                            initialValue: product.price,
                            rules: [
                                { required: true, message: '必须输入价格!' },
                                { validator: this.validatePrice }
                            ],
                        })(<Input type="number" placeholder="商品价格" addonAfter="元" />)}
                    </Item>
                    <Item label="商品分类">
                        {getFieldDecorator('categoryId', {
                            initialValue: product.categoryId || '',
                            rules: [
                                { required: true, message: '必须输入商品分类!' }
                            ],
                        })(
                            <Select>
                                <Option value=''>未选择</Option>
                                {
                                    categorys.map(c => <Option value={c._id} key={c._id}>{c.name}</Option>)
                                }
                            </Select>
                        )}
                    </Item>
                    <Item label="上传图片">
                        {/* 将容器交给需要标记的标签对象, 在解析时就会自动将标签对象保存到容器中(属性名为: current, 属性值标签对象) */}
                        <PicturesWall ref={this.pwRef} imgs={product.imgs} />
                    </Item>
                    <Item label="商品详情" wrapperCol={{ span: 16 }}>
                        {/* 将容器交给需要标记的标签对象, 在解析时就会自动将标签对象保存到容器中(属性名为: current, 属性值标签对象) */}
                        <RichTextEditor detail={product.detail} ref={this.editorRef} ></RichTextEditor>
                    </Item>
                    <Item>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </Item>
                </Form>
            </Card>

        )
    }
}


export default Form.create()(AddUpdate)