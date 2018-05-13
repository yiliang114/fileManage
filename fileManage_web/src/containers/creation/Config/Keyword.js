import React from 'react'
import { Tag, Input, Tooltip, Icon, Switch, Row, Col, Button, Divider, message } from 'antd'
import { kwExtend, kwCheck } from '../../../../services/crowd'
import { inject, observer } from 'mobx-react'
import '../style.less'

@inject('creationStore')
@observer
export default class Keyword extends React.Component {
  state = {
    // kw_valid: [],
    // kw_invalid: [],
    // kw_extend: [],

    // kw_exclude_valid: [],
    // kw_exclude_invalid: [],

    inputVisible: false,
    inputValue: '',

    excludeInputVisible: false,
    excludeInputValue: ''

  };

  // done
  handleClose = (e, target, removedTag) => {
    const {
      changeTags,
      keyword: {
        info
      }
    } = this.props.creationStore

    const maps = ['kw_valid', 'kw_invalid', 'kw_extend', 'kw_exclude_valid', 'kw_exclude_invalid']

    e.preventDefault();

    if (maps.includes(target)) {
      // 删除
      const tags = info[target].filter(tag => tag !== removedTag);
      console.log('tags: ', tags)
      changeTags(target, tags)
    }
  }

  // done
  showInput = (target) => {
    this.setState({ [target]: true }, () => this.input.focus());
  }

  // done
  handleInputChange = (e, key) => {
    const target = key === 'exclude' ? 'excludeInputValue' : 'inputValue'
    this.setState({ [target]: e.target.value });
  }

  // done
  handleInputConfirm = async (key) => {
    const { inputValue, excludeInputValue } = this.state
    const { changeTags, keyword: { info: { kw_valid, kw_invalid, kw_extend, kw_exclude_valid, kw_exclude_invalid } } } = this.props.creationStore
    const EXPAND_TYPE = inputValue && inputValue.length < 10 && [...kw_valid, ...kw_invalid].filter(tag => tag === inputValue).length === 0
    const EXCLUDE_TYPE = excludeInputValue && excludeInputValue.length < 10 && [...kw_exclude_valid, ...kw_exclude_invalid].filter(tag => tag === excludeInputValue).length === 0

    if ([...kw_valid, ...kw_invalid].length > 100 || [...kw_exclude_valid, ...kw_exclude_invalid].length > 20) {
      message.error('个数超出限制~')
      return
    }
    // new
    if (EXPAND_TYPE) {
      // 扩展关键词，先判断是否有效
      const resp = await kwCheck({
        keyword: inputValue
      })
      // const resp = {
      //   code: 0
      // }
      if (resp && resp.code === 0) {
        // 有效
        changeTags('kw_valid', [...kw_valid, inputValue])
      } else {
        // 无效
        changeTags('kw_invalid', [...kw_invalid, inputValue])
      }
      // 重置输入框
      this.setState({
        inputVisible: false,
        inputValue: '',
      })

    } else if (EXCLUDE_TYPE) {
      // 扩展关键词，先判断是否有效
      const resp = await kwCheck({
        keyword: excludeInputValue
      })
      console.log('EXCLUDE_TYPE', resp)
      // const resp = {
      //   code: 0
      // }
      if (resp && resp.code === 0) {
        // 有效
        changeTags('kw_exclude_valid', [...kw_exclude_valid, excludeInputValue])
      } else {
        // 无效
        changeTags('kw_exclude_invalid', [...kw_exclude_invalid, excludeInputValue])
      }
      // 重置输入框
      this.setState({
        excludeInputVisible: false,
        excludeInputValue: '',
      })
    }
  }

  saveInputRef = input => this.input = input
  saveExcludeInputRef = input => this.input = input

  // switch
  switchOnChange = (key, checked) => {
    // 暂时不需要这个参数了
    // const { setKeywordStoreData } = this.props.creationStore
    // const target = key === 'exclude' ? 'is_exclude' : 'is_expand'

    // if (checked) {
    //   setKeywordStoreData(target, 1)
    // } else {
    //   setKeywordStoreData(target, 0)
    // }
  }

  // “扩展”关键词按钮 done
  // 拓展出来重复关键词处理
  extendKeywords = async () => {
    const {
      keyword: {
        expand_num,
      info: {
          kw_valid,
        kw_invalid,
        kw_extend,
        kw_exclude_valid,
        kw_exclude_invalid,
        }
      },
      changeTags
    } = this.props.creationStore
    const resp = await kwExtend({
      num: expand_num,
      keywords: [...kw_valid, ...kw_invalid,]
    })
    if (resp && resp.code === 0) {
      // 多次拓展关键词，需要去重
      const decrease = new Set([...kw_extend, ...resp.data])
      changeTags('kw_extend', Array.from(decrease))
    }

  }

  // 输入扩展关键词个数
  changeInputNumber = (e) => {
    const { setKeywordStoreData } = this.props.creationStore
    if (e.target.value < 0) {
      setKeywordStoreData('expand_num', 0)
    } else {
      setKeywordStoreData('expand_num', e.target.value)
    }
  }

  render() {
    const { inputVisible, inputValue, excludeInputVisible, excludeInputValue } = this.state;
    const {
      expand_num,
      is_exclude,
      is_expand,
      info: {
        kw_valid, kw_invalid, kw_extend, kw_exclude_valid, kw_exclude_invalid
      }
    } = this.props.creationStore.keyword

    return (
      <div>
        <h3>提取设置</h3>
        <Row className="rowBox">
          <Col span={8}>
            <p>录入关键词 <span style={{ color: 'red' }}>*</span>    (最多支持100个关键词）</p>
          </Col>
          <Col span={4} className="colBox">
            <Tag className="lump match">&nbsp;&nbsp;&nbsp;</Tag> <span>已匹配关键词 {kw_valid.length + kw_extend.length}个</span>
          </Col>
          <Col span={4} className="colBox">
            <Tag className="lump">&nbsp;&nbsp;&nbsp;</Tag> <span>未匹配关键词 {kw_invalid.length}个</span>
          </Col>
        </Row>
        <div className="keywordBox">
          {kw_invalid.length !== 0 && kw_invalid.map((tag, index) => {
            const isLongTag = tag.length > 5;
            const tagElem = (
              <Tag key={tag} closable={true} onClose={(e) => this.handleClose(e, 'kw_invalid', tag)}>
                {isLongTag ? `${tag.slice(0, 5)}...` : tag}
              </Tag>
            );
            return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
          })}
          {kw_valid.length !== 0 && kw_valid.map((tag, index) => {
            const isLongTag = tag.length > 5;
            const tagElem = (
              <Tag color="#108ee9" key={tag} closable={true} onClose={(e) => this.handleClose(e, 'kw_valid', tag)}>
                {isLongTag ? `${tag.slice(0, 5)}...` : tag}
              </Tag>
            );
            return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
          })}
          {kw_extend.length !== 0 && kw_extend.map((tag, index) => {
            const isLongTag = tag.length > 5;
            const tagElem = (
              <Tag color="#108ee9" key={tag} closable={true} onClose={(e) => this.handleClose(e, 'kw_extend', tag)}>
                {isLongTag ? `${tag.slice(0, 5)}...` : tag}
              </Tag>
            );
            return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
          })}
          {inputVisible && (
            <Input
              ref={this.saveInputRef}
              type="text"
              size="small"
              style={{ width: 78 }}
              value={inputValue}
              onChange={(e) => this.handleInputChange(e, 'expand')}
              onBlur={() => this.handleInputConfirm('expand')}
              onPressEnter={() => this.handleInputConfirm('expand')}
            />
          )}
          {!inputVisible && (
            <Tag
              onClick={() => this.showInput('inputVisible')}
              style={{ background: '#fff', borderStyle: 'dashed' }}
            >
              <Icon type="plus" /> 输入关键词
          </Tag>
          )}
        </div>
        <ul className="ulBox">
          <li>输入关键词可通过回车换行，或直接粘贴多行文本（每行一个关键词）</li>
          <li>暂只支持词语识别，例如“哪里有最好看的婚纱摄影店”需拆分为“婚纱摄影”</li>
        </ul>

        <Row className="rowBox" style={{ paddingTop: 0 }}>
          <Col span={4}>
            <p>拓展关系词</p>
          </Col>
          <Col span={20}>
            <Switch defaultChecked onChange={(checked) => this.switchOnChange('expand', checked)} />
          </Col>
        </Row>

        {is_expand === 1 && (
          <Row className="rowBox" style={{ paddingTop: 0 }}>
            <Col span={4}>
              <p>拓展词数</p>
            </Col>
            <Col span={4}>
              <Input
                type="number"
                style={{ width: 100 }}
                defaultValue={0}
                value={expand_num}
                onChange={this.changeInputNumber}
              /> 个
          </Col>
            <Col span={3}>
              <p style={{ marginLeft: 5 }}>(请输入1-100)</p>
            </Col>
            <Col span={4}>
              <Button type="primary" onClick={this.extendKeywords}>拓展</Button>
            </Col>
          </Row>
        )}

        <Row className="rowBox" style={{ paddingTop: 0 }}>
          <Col span={4}>
            <p>排除关键词</p>
          </Col>
          <Col span={4}>
            <Switch defaultChecked onChange={(checked) => this.switchOnChange('exclude', checked)} />
          </Col>
          <Col span={4}>
            <p>(最多支持20个关键词)</p>
          </Col>
          <Col span={12}>
            <p>输入关键词可通过回车换行，或直接粘贴多行文本（每行一个关键词）</p>
          </Col>
        </Row>
        <Row className="rowBox">
          <Col span={6} className="colBox">
            <Tag className="lump match">&nbsp;&nbsp;&nbsp;</Tag> <span>已匹配排除关键词 {kw_exclude_valid.length}个</span>
          </Col>
          <Col span={6} className="colBox">
            <Tag className="lump">&nbsp;&nbsp;&nbsp;</Tag> <span>未匹配排除关键词 {kw_exclude_invalid.length}个</span>
          </Col>
        </Row>
        {
          is_exclude === 1 && (
            <div className="keywordBox">
              {kw_exclude_valid.length !== 0 && kw_exclude_valid.map((tag, index) => {
                const isLongTag = tag.length > 5;
                const tagElem = (
                  <Tag color="#108ee9" key={tag} closable={true} onClose={(e) => this.handleClose(e, 'kw_exclude_valid', tag)}>
                    {isLongTag ? `${tag.slice(0, 5)}...` : tag}
                  </Tag>
                );
                return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
              })}
              {kw_exclude_invalid.length !== 0 && kw_exclude_invalid.map((tag, index) => {
                const isLongTag = tag.length > 5;
                const tagElem = (
                  <Tag key={tag} closable={true} onClose={(e) => this.handleClose(e, 'kw_exclude_invalid', tag)}>
                    {isLongTag ? `${tag.slice(0, 5)}...` : tag}
                  </Tag>
                );
                return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
              })}

              {excludeInputVisible && (
                <Input
                  ref={this.saveExcludeInputRef}
                  type="text"
                  size="small"
                  style={{ width: 78 }}
                  value={excludeInputValue}
                  onChange={(e) => this.handleInputChange(e, 'exclude')}
                  onBlur={() => this.handleInputConfirm('exclude')}
                  onPressEnter={() => this.handleInputConfirm('exclude')}
                />
              )}
              {!excludeInputVisible && (
                <Tag
                  onClick={() => this.showInput('excludeInputVisible')}
                  style={{ background: '#fff', borderStyle: 'dashed' }}
                >
                  <Icon type="plus" /> 输入排除关键词
              </Tag>
              )}
            </div>
          )
        }

        <Divider />

      </div >
    );
  }
}