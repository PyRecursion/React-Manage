import React from 'react';
import { Upload, Icon, Modal, message } from 'antd';
import { reqDeleteImg } from '../../api';
import { BASE_IMG } from '../../utils/Constants'



function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {
  state = {
    previewVisible: false,//标识是否显示大图预览
    previewImage: '',//大图的url或base64的值
    fileList: [
      // {//文件信息对象
      //   uid: '-1',//唯一标识
      //   name: 'image.png', //文件名
      //   status: 'done',//状态
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',//图片地址
      // },

    ],
  };

  componentWillMount () {
    // 根据传入的imgs生成fileList并更新
    const imgs = this.props.imgs
    if (imgs && imgs.length>0) {
      const fileList = imgs.map((img, index) => ({
        uid: -index, // 唯一标识
        name: img, // 文件名
        status: 'done', // 状态有：uploading done error removed
        url: BASE_IMG + img
      }))
      this.setState({ fileList })
    }
  }
  getImgs = () => this.state.fileList.map(file => file.name)
 
  handleCancel = () => this.setState({ previewVisible: false });

  /*
  进行大图预览的回调函数
  */
  handlePreview = async file => {
    if (!file.url && !file.preview) { //如果file没有url 只进行一次base64来处理图片
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  /*
  file的状态发生改变的监听回调
  file:当前操作(删除/上传)的file
  */
  handleChange = async ({ file, fileList }) => {
    // file与fileList中最后一个file代表同个图片的不同对象
    console.log('handleChange()', file.status, file === fileList[fileList.length - 1])
    // 如果上传成功
    if (file.status === 'done') {
      // 将数组最后一个file保存到file变量
      file = fileList[fileList.length - 1]
      // 取出响应数据中的图片文件名和url
      const { name, url } = file.response.data
      // 保存到上传的file对象
      file.name = name
      file.url = url
    } else if (file.status === 'removed') { // 删除
      const result = await reqDeleteImg(file.name)
      if (result.status === 0) {
        message.success('删除图片成功')
      } else {
        message.error('删除图片失败')
      }
    }
    // 更新状态
    this.setState({ fileList })
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/manage/img/upload" //上传地址
          name="image" //图片文件对应的参数名
          listType="picture" //显示风格
          fileList={fileList} //已上传所有图片的
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

