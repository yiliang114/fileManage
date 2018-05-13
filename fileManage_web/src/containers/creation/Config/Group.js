import React from 'react'
import { Row, Col, Input, Table, Divider, Tag, Select, Radio, Button, Modal, Icon } from 'antd'
import { inject, observer } from 'mobx-react'
import WarnModal from '../../WarnModal'
import classnames from 'classnames';
import AccreditModal from '../../AccreditModal'
import { getCrowdList } from '../../../../services/crowd'

const Search = Input.Search;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@inject('creationStore', 'elementStore')
@observer
export default class Group extends React.Component {

  state = {

    searchText: '',
    visible: false,
    areaNum: 1,
    currentArea: 1,
    current: 1,

    includeList: [],
    totalIncludeList: [],
    excludeList: [],
    totalExcludeList: [],
    selectedRowKeys: [],

    // new
    // 最终数据结构 
    // INCLUDE_LIST/EXCLUDE_LIST: [[], [], []...]
    // coord: [0,0] 第一个数字表示是 包含数组 还是 排除数组
    INCLUDE_LIST: [[]],
    EXCLUDE_LIST: [[]],
    coord: [0, 0],

    crowdList: [],
    maxLength: 10,
    id: null

  }

  async componentDidMount() {
    // 排除 组合 和 扩展 的人群
    const resp = await getCrowdList({
      type: [1, 2, 3, 4],
      limit: 'all',
      extract_status: [2]
    })
    this.setState({
      crowdList: resp.data
    })
  }

  showModal = (record) => {
    this.setState({
      visible: true,
      // record
    })
    this.setState({ id: record.datasource.id })
    this.props.elementStore.changeSearchText(record.name)
  }

  // todo, 限制选中人群个数是右边区域
  onSelectChange = (selectedRowKeys) => {
    const index = selectedRowKeys.concat().pop() - 1
    this.setState({
      selectedRowKeys: selectedRowKeys.slice(0, this.state.maxLength)
    })
  }

  // 列表不能选中项
  getCheckboxProps = (record) => ({
    disabled: record.datasource.is_authorize === 0,
    name: record.name,
  })

  // done
  onSearch = async (value) => {
    const resp = await getCrowdList({
      name: value,
      type: [1, 2, 3, 4]
    })
    if (resp && resp.data) {
      console.log('resp: ', resp.code)
      this.setState({
        crowdList: resp.data
      })
    }
  }

  // 添加分组 todo
  addGroup = (key) => {
    const { coord, INCLUDE_LIST, EXCLUDE_LIST, maxLength } = this.state

    // 弹框警告个数限制
    const length = this.sumArrayNum([...INCLUDE_LIST, ...EXCLUDE_LIST])
    if (length > maxLength - 1) {
      this.props.creationStore.changeCBWarnModalVisible(true)
      return
    }

    // 确认是否是当前选中框
    // 只有本区域内的“添加分组”按钮点击之后才能给区域添加分组，比如当前选中区域是 “包含以下人群/组合” ，但是点击的是 “排除以下人群/组合”的 “添加分组”按钮，是无效的
    if (key !== coord[0]) {
      return
    }

    // 只改变 下标为1 的值
    const list_target = coord[0] === 0 ? 'INCLUDE_LIST' : 'EXCLUDE_LIST'
    let newCoord = [coord[0], coord[1] + 1]
    // 保证当前区域分组不为空，才能添加分组
    const nowGroup = this.state[list_target][coord[1]]
    console.log('nowGroup', nowGroup)
    if (nowGroup.length !== 0) {
      this.setState({
        coord: newCoord,
        [list_target]: [...this.state[list_target], []]
      })
    }

  }

  // 改变组合 done
  changeCombination = (e, value) => {
    // console.log(e.target.type === 'button')
    const { coord } = this.state
    const list_target = value === 0 ? 'INCLUDE_LIST' : 'EXCLUDE_LIST'

    // 判断是否当前选中
    if (e.target.type !== 'button') {
      let newCoord = [value, this.state[list_target].length - 1]
      this.setState({
        coord: newCoord
      })
    }
  }

  // 右边联动
  linkage = () => {
    const {
      current,
      selectedRowKeys,
      crowdList,
      INCLUDE_LIST,
      EXCLUDE_LIST,
      coord,
      maxLength
    } = this.state
    // 弹框警告个数限制
    const length = this.sumArrayNum([...INCLUDE_LIST, ...EXCLUDE_LIST])
    if (length > maxLength - 1) {
      this.props.creationStore.changeCBWarnModalVisible(true)
      return
    }

    const list_target = coord[0] === 0 ? 'INCLUDE_LIST' : 'EXCLUDE_LIST'
    const index = coord[1]

    // selectedRowKeys
    const selectList = crowdList.concat().filter(item => {
      if (selectedRowKeys.indexOf(item.id) > -1) {
        return true
      } else {
        return false
      }
    })

    // console.log('selectList', selectList, 'index', index) 
    const list = this.state[list_target]
    list[index] = [...list[index], ...selectList]

    // 对象数组去重： 同一分组中对象值唯一
    var hash = {};
    list[index] = list[index].reduce(function (item, next) {
      hash[next.id] ? '' : hash[next.id] = true && item.push(next);
      return item
    }, [])
    // console.log('list[index]', list[index]);
    // console.log('newlist: ', list)

    this.setState({
      [list_target]: list,
      // 联动之后去除列表选中状态
      selectedRowKeys: []
    }, () => console.log(list_target, list))


  }

  // logic_str
  jointLoginStr = (list) => {
    // const a = [['A', 'B', 'C'], ['D', 'E'], ['F']]
    const result = list.map((arr, index) => {
      const temp = arr.map((item, idx) => {
        if (idx !== 0) {
          return ` ∪ ${item.id}`
        }
        return item.id
      })
      return index !== 0 ? ` ∩ ( ${temp.join('')} )` : `( ${temp.join('')} )`
    })
    return result.join('')
  }

  // logic_str
  jointLetterLoginStr = (list) => {
    const letterMaps = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    // const a = [['A', 'B', 'C'], ['D', 'E'], ['F']]
    const { INCLUDE_LIST, EXCLUDE_LIST } = this.state
    const result = list.map((arr, index) => {
      const temp = arr.map((item, idx) => {
        let letter = letterMaps[this.spreadArrayObjectIndex([...INCLUDE_LIST, ...EXCLUDE_LIST], item.id)]
        if (idx !== 0) {
          return ` ∪ ${letter}`
        }
        return letter
      })
      return index !== 0 ? ` ∩ ( ${temp.join('')} )` : `( ${temp.join('')} )`
    })
    return result.join('')
  }

  // 组合逻辑显示
  getCombinationStr = () => {
    const { INCLUDE_LIST, EXCLUDE_LIST } = this.state
    const result = EXCLUDE_LIST[0].length === 0
      ? this.jointLoginStr(INCLUDE_LIST)
      : `${this.jointLoginStr(INCLUDE_LIST)} ∩ !${this.jointLoginStr(EXCLUDE_LIST)}`
    this.props.creationStore.setValue('group', 'crowd_str', result)

    // return result
  }

  getLetterCombinationStr = () => {
    const { INCLUDE_LIST, EXCLUDE_LIST } = this.state
    const result = EXCLUDE_LIST[0].length === 0
      ? this.jointLetterLoginStr(INCLUDE_LIST)
      : `${this.jointLetterLoginStr(INCLUDE_LIST)} ∩ !${this.jointLetterLoginStr(EXCLUDE_LIST)}`
    this.props.creationStore.setValue('group', 'logic_str', result)

    return result
  }

  // 获取二维数组铺平展开的下标值
  spreadArrayObjectIndex = (ArrayObject, id) => {
    console.log('ArrayObjectArrayObjectArrayObjectArrayObject', ArrayObject)
    if (ArrayObject instanceof Array && ArrayObject[0] instanceof Array && (ArrayObject[0][0] instanceof Object || ArrayObject[1][0] instanceof Object)) {
      var targetX = ArrayObject.filter(xitem => {
        var result = xitem.map(yitem => yitem.id === id)
        return result.includes(true)
      })
      // if (!targetX || !targetX[0]) return
      var idxX = ArrayObject.indexOf(targetX[0])
      var targetY = targetX[0].filter(item => item.id === id)
      var idxY = targetX[0].indexOf(targetY[0])
      // console.log(idxX, idxY)
      var total = 0
      for (var i = 0; i < idxX; i++) {
        total += ArrayObject[i].length
      }
      total += idxY
      console.log('total', total)
      return total
    }
  }

  // 获取二维数组的总个数
  sumArrayNum = (array) => {
    // 二维数组
    if (array instanceof Array && array[0] instanceof Array) {
      const lengthArray = array.map(item => item.length)
      return lengthArray.reduce((total, num) => total + num)
    }
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  handleOk = (e) => {
    this.setState({
      visible: false
    });
    this.props.elementStore.changeAccreditVisible(true)
  }

  // 删除选中的人群
  delSelectCrowd = (e, index, idx, key, record) => {
    e.preventDefault();
    console.log('record', index, idx, key, record, record === this.state[key][index][idx])
    this.state[key][index][idx]
    if (this.state[key] && this.state[key][index]) {
      const result = this.state[key][index].filter(item => item !== this.state[key][index][idx])
      console.log('result: ', result, this.state[key])
      // 替换过滤之后的数组
      const area = this.state[key]
      area[index] = result

      console.log('area', area)
      // 更新state，以re-render
      this.setState({
        [key]: area
      })
    }
    // console.log(key, this.state[key])
  }

  render() {
    const { changeCBWarnModalVisible } = this.props.creationStore;
    const { selectedRowKeys } = this.state

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      getCheckboxProps: this.getCheckboxProps
    };

    const columns = [{
      title: '人群名称',
      dataIndex: 'name',
      render: (text, record) => {
        return record.datasource.is_authorize == 0 ? <a onClick={() => this.showModal(record)}>{record.name}</a> : <p style={{ margin: 0 }}>{record.name}</p>
      },
      width: 200,
      key: 'name',
    },
    {
      title: '人群ID',
      dataIndex: 'id',
      key: 'id',
      width: 150
    }, {
      title: '人群规模',
      dataIndex: 'num',
      key: 'num',
      width: 150
    }]

    const {
      current,
      crowdList,
      totalIncludeList,
      excludeList,
      coord,
      INCLUDE_LIST,
      EXCLUDE_LIST
    } = this.state

    const letterMaps = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    return (
      <div>
        <h4>组合人群</h4>
        <Row>
          <Col span={12}>
            <Search
              placeholder="搜索人群名称、人群ID"
              onSearch={this.onSearch}
              enterButton
            />
            <Table className="hide-check-all" rowSelection={rowSelection} columns={columns} dataSource={crowdList} rowKey={record => record.id} dataSource={crowdList} pagination={false} scroll={{ y: 500 }} />
            <WarnModal />
          </Col>
          <Col span={3}>
            <div className="buttonBox">
              <Button type="primary" onClick={this.linkage}>选择</Button>
            </div>
          </Col>
          <Col span={9}>
            {/* ∪  ∩*/}
            <h4>提取设置</h4>
            {/* <h4>组合逻辑： <span style={{ color: 'red'}}>
              {this.getCombinationStr()}
            </span></h4> */}
            <h4>组合逻辑： <span style={{ color: 'red' }}>
              {this.getLetterCombinationStr()}
              {this.getCombinationStr()}
            </span></h4>
            <div onClick={(e) => this.changeCombination(e, 0)} className={classnames(['area-container'], {
              'area-collapsed': coord[0] === 0
            })}>
              <h5>包含以下人群/组合</h5>
              <div>
                {INCLUDE_LIST.map((group, index) => {
                  return <div key={index}>
                    {
                      index !== 0 && <p className="and" key={index}>并</p>
                    }
                    {
                      group.map((item, idx) => {
                        return <p>
                          <Tag closable key={item.id} onClose={(e) => this.delSelectCrowd(e, index, idx, 'INCLUDE_LIST', item)}>{letterMaps[this.spreadArrayObjectIndex([...INCLUDE_LIST, ...EXCLUDE_LIST], item.id)]}-{item.name}</Tag>
                        </p>
                      })
                    }
                  </div>
                })}
              </div>

              <div style={{ marginTop: 20 }}>
                <Button icon="plus" style={{ borderWidth: 0 }} onClick={() => this.addGroup(0)}>添加分组（并且）</Button>
              </div>

            </div>

            <div style={{ marginTop: 20 }} onClick={(e) => this.changeCombination(e, 1)} className={classnames(['area-container'], {
              'area-collapsed': coord[0] === 1
            })}>
              <h5>排除以下人群/组合</h5>
              <div>
                {EXCLUDE_LIST.map((group, index) => {
                  return <div key={index}>
                    {
                      index !== 0 && <p className="and" key={index}>并</p>
                    }
                    {
                      group.map((item, idx) => {
                        return <p>
                          <Tag closable key={item.id} onClose={(e) => this.delSelectCrowd(e, index, idx, 'EXCLUDE_LIST', item)}>{letterMaps[this.spreadArrayObjectIndex([...INCLUDE_LIST, ...EXCLUDE_LIST], item.id)]}-{item.name}</Tag>
                        </p>
                      })
                    }
                  </div>
                })}
              </div>
              <div style={{ marginTop: 20 }}>
                <Button icon="plus" style={{ borderWidth: 0 }} onClick={() => this.addGroup(1)}>添加分组（并且）</Button>
              </div>

            </div>
          </Col>
        </Row>
        <Divider />

        <Modal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="primary" onClick={this.handleOk}>去授权</Button>
              <Button onClick={this.handleCancel}>不授权</Button>
            </div>
          }
        >
          <p>该数据未授权，不可选</p>
        </Modal>
        <AccreditModal crowdId={this.state.id} />

      </div>
    )
  }
}

