import { InMemoryDbService } from 'angular-in-memory-web-api';
import {endTimeRange, startTimeRange} from "@angular/core/src/profile/wtf_impl";
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let menus = [
      { id: 1,name: '系统管理', coding: '01', address: 'home/menu',
        parentCode:'00', parentName: '首页',   newWindow: '否', details: '这是第一个菜单的详情'
      },
      { id: 2,name: '用户管理', coding: '02', address: 'http://localhost:3000/menu',
        parentCode:'01', parentName: '系统管理',   newWindow: '否',  details: '这是第二个菜单的详情'
      },
      { id: 3,name: '角色管理', coding: '02', address: 'http://localhost:3000/menu',
        parentCode:'01', parentName: '系统管理',   newWindow: '否',  details: '这是第二个菜单的详情'
      },
      { id: 4,name: '权限管理', coding: '02', address: 'http://localhost:3000/menu',
        parentCode:'01', parentName: '系统管理',   newWindow: '否',  details: '这是第二个菜单的详情'
      },
      { id: 5,name: '菜单管理', coding: '02', address: '/home/menu',
        parentCode:'01', parentName: '系统管理',   newWindow: '否',  details: '这是第二个菜单的详情'
      },
      { id: 6,name: '字典管理', coding: '02', address: 'http://localhost:3000/menu',
        parentCode:'01', parentName: '系统管理',  newWindow: '否',  details: '这是第二个菜单的详情'
      },
      { id: 7,name: '帮助', coding: '02', address: 'http://localhost:3000/menu',
        parentCode:'01', parentName: '系统管理',   newWindow: '否',  details: '这是第二个菜单的详情'
      },


      { id: 8,name: '设备管理', coding: '02', address: 'http://localhost:3000/menu',
        parentCode:'00', parentName: '首页',   newWindow: '否',  details: '这是第二个菜单的详情'
      },
      // {id: 3, name: '报警信息', coding: '03', address: 'http://localhost:3000/menu',
      //   parentCode: 13, parentName: '首页', addTime: '2017-05-05', selected: false, newWindow: '是',  details: '这是第三个菜单的详情'},
      // {id: 4, name: '数据字典', coding: '04', address: 'http://localhost:3000/menu',
      //   parentCode: 14, parentName: '字典管理', addTime: '2016-05-05', selected: false, newWindow: '否',  details: '这是第四个菜单的详情'},
      // {id: 5, name: '菜单列表', coding: '05', addTime: '2017-05-05', address: 'http://localhost:3000/menu',
      //   parentCode: 15, parentName: '菜单管理',  newWindow: '否',  details: '这是第五个菜单的详情'},
      { id: 9,name: '报警信息', coding: '06', address: 'http://localhost:3000/menu',
        parentCode:'02', parentName: '设备管理',  selected: false, newWindow: '否',  details: '这是第六个菜单的详情'},
      // {id: 7, name: '配置界面', coding: '03', address: 'http://localhost:3000/menu',
      //   parentCode: 13, parentName: '首页', selected: false, newWindow: '是',  details: '这是第七个菜单的详情'},
      { id: 10,name: '轨迹信息', coding: '06', address: 'track',
        parentCode:'02', parentName: '设备管理',  newWindow: '是',  details: '这是第十个菜单的详情'},

      { id: 11,name: '电量信息', coding: '06', address: 'electricity',
        parentCode:'02', parentName: '设备管理',  newWindow: '是',  details: '这是第十个菜单的详情'},
      { id: 12,name: '设备状态', coding: '06', address: 'http://localhost:3000/menu',
        parentCode:'02', parentName: '设备管理',  newWindow: '是',  details: '这是第十个菜单的详情'},
      { id: 13,name: '配置信息', coding: '06', address: 'http://localhost:3000/menu',
        parentCode:'02', parentName: '设备管理',  newWindow: '是',  details: '这是第十个菜单的详情'}
    ];
    return {menus};
  }
  // createDb() {
  //   let users = [
  //     {id: 1, name: '张三', address: '陕西省西安市雁塔区', sex: '女', equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）',
  //       time: '2017-04-17 17:58:32', psd: 'wqeqewqr', character: '超级管理员',
  //       phone: '13279585637', details: '用户1在xxxx年12月20号发生跌倒，这里是测试信息，这里是测试信息', inline: '在线'},
  //     {id: 2, name: '李四', address: '陕西省西安市高新区',  sex: '男', equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）',
  //       time: '2017-04-17 17:58:32', psd: '1212324', character: '普通用户',
  //       phone: '13279585637',  details: '用户2在xxxx年17月20号发生跌倒，这里是测试信息，这里是测试信息', inline: '在线'},
  //     {id: 3, name: '张三丰', address: '陕西省西安市雁塔区',  sex: '男', equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）',
  //       time: '2017-04-17 17:58:32', psd: '3242425', character: '初级管理员',
  //       phone: '13279585637', details: '用户3在xxxx年12月20号发生跌倒，这里是测试信息，这里是测试信息', inline: '离线'},
  //     {id: 4, name: '王武', address: '陕西省西安市雁塔区',  sex: '女', equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）',
  //       time: '2017-04-17 17:58:32', psd: '88888888', character: '超级管理员',
  //       phone: '13279585637', details: '用户4在xxxx年12月20号发生跌倒，这里是测试信息，这里是测试信息', inline: '在线'},
  //     {id: 5, name: '李嘉诚', address: '陕西省西安市雁塔区',  sex: '男',  equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）',
  //       time: '2017-04-17 17:58:32', psd: '33333333', character: '普通用户',
  //       phone: '13279585637', details: '用户5在xxxx年12月20号发生跌倒，这里是测试信息，这里是测试信息', inline: '离线'},
  //     {id: 6, name: '张嘉译', address: '陕西省西安市雁塔区',  sex: '女', equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）',
  //       time: '2017-04-17 17:58:32', psd: '66666666', character: '初级管理员',
  //       phone: '13279585637', details: '用户6在xxxx年10月20号发生跌倒，这里是测试信息，这里是测试信息', inline: '在线'},
  //     {id: 7, name: '范冰冰', address: '陕西省西安市雁塔区',  sex: '女', equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）',
  //       time: '2017-04-17 17:58:32', psd: '88888888', character: '超级管理员',
  //       phone: '13279585637', details: '用户7在xxxx年12月20号发生跌倒，这里是测试信息，这里是测试信息', inline: '在线'},
  //     {id: 8, name: '张无忌', address: '陕西省西安市雁塔区',  sex: '男',  equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）',
  //       time: '2017-04-17 17:58:32', psd: '33333333', character: '普通用户',
  //       phone: '13279585637', details: '用户8在xxxx年12月20号发生跌倒，这里是测试信息，这里是测试信息', inline: '离线'},
  //     {id: 9, name: '王晓丽', address: '陕西省西安市雁塔区',  sex: '女', equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）',
  //       time: '2017-04-17 17:58:32', psd: '66666666', character: '初级管理员',
  //       phone: '13279585637', details: '用户9在xxxx年10月20号发生跌倒，这里是测试信息，这里是测试信息', inline: '在线'},
  //   ];
  //   return {users};
  // }
  // createDb() {
  //   let warns = [
  //     {id: 1, name: '张三', equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）',  time: '2017-04-17 17:58:32',
  //       phone: '13279585637', details: '用户1在xxxx年12月20号发生跌倒，这里是测试信息，这里是测试信息', inline: '在线'},
  //     {id: 2, name: '李四', equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）',  time: '2017-04-17 17:58:32',
  //       phone: '13279585637', details: '用户2在xxxx年17月20号发生跌倒，这里是测试信息，这里是测试信息', inline: '在线'},
  //     {id: 3, name: '张三', equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）',  time: '2017-04-17 17:58:32',
  //       phone: '13279585637', details: '用户3在xxxx年12月20号发生跌倒，这里是测试信息，这里是测试信息', inline: '离线'},
  //     {id: 4, name: '王武', equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）',  time: '2017-04-17 17:58:32',
  //       phone: '13279585637', details: '用户4在xxxx年12月20号发生跌倒，这里是测试信息，这里是测试信息', inline: '在线'},
  //     {id: 5, name: '张三', equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）',  time: '2017-04-17 17:58:32',
  //       phone: '13279585637', details: '用户5在xxxx年12月20号发生跌倒，这里是测试信息，这里是测试信息', inline: '离线'},
  //     {id: 6, name: '张三', equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）',  time: '2017-04-17 17:58:32',
  //       phone: '13279585637', details: '用户6在xxxx年10月20号发生跌倒，这里是测试信息，这里是测试信息', inline: '在线'},
  //   ];
  //   return {warns};
  // }
  // createDb() {
  //   let characters = [
  //     {id: 1, name: 'admin', deluser: true, adduser: true, addchar: false, delchar: false, modauth: true, viewlog: true,
  //       addTime: '2017-04-17 17:58:32',
  //       describe: '所有功能模块均能执行', auth: '增删改查', details: '这里是角色一的测试信息' },
  //     {id: 2, name: 'admin', deluser: true, adduser: true, addchar: false, delchar: false, modauth: true, viewlog: true,
  //       addTime: '2017-04-17 17:58:32', describe: '所有功能模块均能执行', auth: '增删改查', details: '这里是角色二的测试信息' },
  //     {id: 3, name: 'admin', deluser: true, adduser: true, addchar: false, delchar: false, modauth: true, viewlog: true,
  //       addTime: '2017-04-17 17:58:32', describe: '所有功能模块均能执行', auth: '增删改查', details: '这里是角色三的测试信息' },
  //     {id: 4, name: 'admin', deluser: true, adduser: true, addchar: false, delchar: false, modauth: true, viewlog: true,
  //       addTime: '2017-04-17 17:58:32', describe: '所有功能模块均能执行', auth: '增删改查', details: '这里是角色四的测试信息' },
  //     {id: 5, name: 'admin', deluser: true, adduser: true, addchar: false, delchar: false, modauth: true, viewlog: true,
  //       addTime: '2017-04-17 17:58:32', describe: '所有功能模块均能执行', auth: '增删改查', details: '这里是角色五的测试信息' },
  //     {id: 6, name: 'admin', deluser: true, adduser: true, addchar: false, delchar: false, modauth: true, viewlog: true,
  //       addTime: '2017-04-17 17:58:32', describe: '所有功能模块均能执行', auth: '增删改查', details: '这里是角色六的测试信息' },
  //     {id: 7, name: 'admin', deluser: true, adduser: true, addchar: false, delchar: false, modauth: true, viewlog: true,
  //       addTime: '2017-04-17 17:58:32', describe: '所有功能模块均能执行', auth: '增删改查', details: '这里是角色七的测试信息' },
  //   ];
  //   return {characters};
  // }
  // createDb() {
  //   let dictionarys = [
  //     {id: 1, name: '系统管理', coding: '001', valid: true, pub: false, edit: true, del: false, describe: ''},
  //     {id: 2, name: '系统设置', coding: '002', valid: true, pub: false, edit: true, del: false, describe: ''},
  //     {id: 3, name: '配置界面', coding: '003', valid: true, pub: false, edit: true, del: false, describe: ''},
  //     {id: 4, name: '管理会员', coding: '004', valid: true, pub: false, edit: true, del: true, describe: ''},
  //     {id: 5, name: '扩展模块', coding: '005', valid: false, pub: false, edit: true, del: false, describe: ''},
  //     {id: 6, name: '帮助', coding: '006', valid: true, pub: false, edit: true, del: false, describe: ''},
  //     {id: 7, name: '配置界面', coding: '003', valid: true, pub: false, edit: true, del: false, describe: ''},
  //     {id: 8, name: '管理会员', coding: '004', valid: true, pub: false, edit: true, del: true, describe: ''},
  //     {id: 9, name: '扩展模块', coding: '005', valid: false, pub: false, edit: true, del: false, describe: ''},
  //     {id: 10, name: '帮助', coding: '006', valid: true, pub: false, edit: true, del: false, describe: ''},
  //   ];
  //   return {dictionarys};
  // }
  // createDb() {
  //   let tracks = [
  //     {id: 1, name: '张三', equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）', time: '2017-04-17 17:58:32',
  //       details: '这里是1111轨迹详情xxxx'},
  //     {id: 2, name: '张三', equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）', time: '2017-04-17 17:58:32',
  //       details: '这里是222轨迹详情xxxx'},
  //     {id: 3, name: '赵思', equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）', time: '2017-04-17 17:58:32',
  //       details: '这里是333轨迹详情xxxx'},
  //     {id: 4, name: '张三', equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）', time: '2017-04-17 17:58:32',
  //       details: '这里是4444轨迹详情xxxx'},
  //     {id: 5, name: '王武', equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）', time: '2017-04-17 17:58:32',
  //       details: '这里是5555轨迹详情xxxx'},
  //     {id: 6, name: '张三', equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）', time: '2017-04-17 17:58:32',
  //       details: '这里是6666轨迹详情xxxx'},
  //     {id: 7, name: '赵思', equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）', time: '2017-04-17 17:58:32',
  //       details: '这里是7777轨迹详情xxxx'},
  //     {id: 8, name: '张三', equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）', time: '2017-04-17 17:58:32',
  //       details: '这里是8888轨迹详情xxxx'},
  //     {id: 9, name: '王武', equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）', time: '2017-04-17 17:58:32',
  //       details: '这里是9999轨迹详情xxxx'},
  //     {id: 10, name: '张三', equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）', time: '2017-04-17 17:58:32',
  //       details: '这里是10101010轨迹详情xxxx'},
  //   ];
  //   return {tracks};
  // }
  // createDb() {
  //   let status = [
  //     {id: 1, name: '张三', equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）',
  //       eles: '86%', line: '在线', mode: '站起', details: '这里是设备一的状态详情',
  //       date: [ '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32',
  //      '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32'],
  //       stau: [ '跌倒', '站起', '跌倒', '站起', '跌倒', '站起', '跌倒', '站起', '跌倒', '站起']
  //     },
  //     {id: 2, name: '张三', equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）',
  //       eles: '95%', line: '在线', mode: '站起', details: '这里是设备二的状态详情',
  //       date: [ '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32',
  //         '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32'],
  //       stau: ['站起', '跌倒', '站起', '跌倒', '站起', '跌倒', '站起', '跌倒', '站起', '跌倒']},
  //     {id: 3, name: '李思', equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）',
  //       eles: '51%', line: '离线', mode: '跌倒', details: '这里是设备三的状态详情',
  //       date: [ '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32',
  //         '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32'],
  //       stau: [ '跌倒', '站起', '跌倒', '站起', '跌倒', '站起', '跌倒', '站起', '跌倒', '站起']
  //     },
  //     {id: 4, name: '张三', equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）',
  //       eles: '83%', line: '在线', mode: '站起', details: '这里是设备四的状态详情',
  //       date: [ '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32',
  //         '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32'],
  //       stau: [ '跌倒', '跌倒', '跌倒', '跌倒', '跌倒', '跌倒', '跌倒', '跌倒', '跌倒', '跌倒']},
  //     {id: 5, name: '张三', equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）',
  //       eles: '86%', line: '离线', mode: '跌倒', details: '这里是设备五的状态详情',
  //       date: [ '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32',
  //         '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32'],
  //       stau: [ '站起', '站起', '站起', '站起', '站起', '站起', '站起', '站起', '站起', '站起']},
  //     {id: 6, name: '王武', equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）',
  //       eles: '37%', line: '在线', mode: '站起', details: '这里是设备六的状态详情',
  //       date: [ '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32',
  //         '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32'],
  //     stau: [ '跌倒', '跌倒', '跌倒', '跌倒', '跌倒', '跌倒', '跌倒', '跌倒', '跌倒', '跌倒']},
  //     {id: 7, name: '李思', equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）',
  //       eles: '51%', line: '离线', mode: '跌倒', details: '这里是设备七的状态详情',
  //       date: [ '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32',
  //         '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32'],
  //       stau: [ '站起', '站起', '站起', '站起', '站起', '站起', '站起', '站起', '站起', '站起']},
  //     {id: 8, name: '张三', equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）',
  //       eles: '83%', line: '在线', mode: '站起', details: '这里是设备八的状态详情',
  //       date: [ '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32',
  //         '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32'],
  //       stau: [ '跌倒', '跌倒', '跌倒', '跌倒', '跌倒', '跌倒', '跌倒', '跌倒', '跌倒', '跌倒']},
  //     {id: 9, name: '张三', equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）',
  //       eles: '86%', line: '离线', mode: '跌倒', details: '这里是设备九的状态详情',
  //       date: [ '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32',
  //         '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32'],
  //       stau: [ '站起', '站起', '站起', '站起', '站起', '站起', '站起', '站起', '站起', '站起']},
  //     {id: 10, name: '王武', equipmentID: '003629303232330B473334', location: 'GPS（34.23266,108.91293）',
  //       eles: '37%', line: '在线', mode: '站起', details: '这里是设备十的状态详情',
  //       date: [ '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32',
  //         '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32'],
  //       stau: [ '跌倒', '跌倒', '跌倒', '跌倒', '跌倒', '跌倒', '跌倒', '跌倒', '跌倒', '跌倒']},
  //   ];
  //   return {status};
  // }
  // createDb() {
  //   let electricities = [
  //     {id: 1, name: '张三', equipmentID: '003629303232330B473334', elec: '30', time: '2017-04-17 17:58:32', details: '这里是电量一的详情',
  //       data: [ 2, 3, 5, 8, 13, 15, 21, 10, 18, 30, 25, 15, 20, 10, 30, 20 ],
  //       date: [ '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32',
  //       '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32']},
  //     {id: 2, name: '张三', equipmentID: '003629303232330B473334', elec: '46', time: '2017-04-17 17:58:32', details: '这里是电量二的详情',
  //       data: [ 0, 0, 5, 8, 13, 15, 21, 10, 18, 30],
  //       date: [ '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32',
  //         '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32',]},
  //     {id: 3, name: '李思', equipmentID: '003629303232330B473334', elec: '73', time: '2017-04-17 17:58:32', details: '这里是电量三的详情',
  //       data: [ 1, 1, 5, 8, 13, 15, 21, 10, 18, 30],
  //       date: [ '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32',
  //         '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32']},
  //     {id: 4, name: '张三', equipmentID: '003629303232330B473334', elec: '57', time: '2017-04-17 17:58:32', details: '这里是电量四的详情',
  //       data: [ 2, 2, 5, 8, 13, 15, 21, 10, 18, 30],
  //       date: [ '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32',
  //         '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32']},
  //     {id: 5, name: '王武', equipmentID: '003629303232330B473334', elec: '65', time: '2017-04-17 17:58:32', details: '这里是电量五的详情',
  //       data: [ 3, 3, 5, 8, 13, 15, 21, 10, 18, 30],
  //       date: [ '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32',
  //         '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32']},
  //     {id: 6, name: '张三', equipmentID: '003629303232330B473334', elec: '30', time: '2017-04-17 17:58:32', details: '这里是电量六的详情',
  //       data: [ 4, 4, 5, 8, 13, 15, 21, 10, 18, 30],
  //       date: [ '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32',
  //         '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32']},
  //     {id: 7, name: '李思', equipmentID: '003629303232330B473334', elec: '73', time: '2017-04-17 17:58:32', details: '这里是电量七的详情',
  //       data: [ 5, 5, 5, 8, 13, 15, 21, 10, 18, 30],
  //       date: [ '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32',
  //         '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32']},
  //     {id: 8, name: '张三', equipmentID: '003629303232330B473334', elec: '76', time: '2017-04-17 17:58:32', details: '这里是电量八的详情',
  //       data: [ 6, 6, 5, 8, 13, 15, 21, 10, 18, 30],
  //       date: [ '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32',
  //         '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32']},
  //     {id: 9, name: '王武', equipmentID: '003629303232330B473334', elec: '65', time: '2017-04-17 17:58:32', details: '这里是电量九的详情',
  //       data: [ 7, 7, 5, 8, 13, 15, 21, 10, 18, 30],
  //       date: [ '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32',
  //         '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32']},
  //     {id: 10, name: '张三', equipmentID: '003629303232330B473334', elec: '81', time: '2017-04-17 17:58:32', details: '这里是电量十的详情',
  //       data: [ 8, 8, 5, 8, 13, 15, 21, 10, 18, 30],
  //       date: [ '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32',
  //         '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32', '2017-04-17 17:58:32']},
  //   ];
  //   return {electricities};
  // }


  // createDb() {
  //   let logs = [
  //     {id: 1, name: 'admin', character: '管理员', equipmentID: '003629303232330B473334', operate: '登录系统成功',
  //       operateIP: '127.0.0.1', operateTime: '2017-04-17 09:35:18', details: '这里是用户一的日志详情' },
  //     {id: 2, name: 'admin', character: '管理员', equipmentID: '003629303232330B473334', operate: '登录系统成功',
  //       operateIP: '127.0.0.1', operateTime: '2017-04-17 09:35:18', details: '这里是用户二的日志详情' },
  //     {id: 3, name: 'admin', character: '管理员', equipmentID: '003629303232330B473334', operate: '登录系统成功',
  //       operateIP: '127.0.0.1', operateTime: '2017-04-17 09:35:18', details: '这里是用户三的日志详情' },
  //     {id: 4, name: 'admin', character: '管理员', equipmentID: '003629303232330B473334', operate: '登录系统成功',
  //       operateIP: '127.0.0.1', operateTime: '2017-04-17 09:35:18', details: '这里是用户四的日志详情' },
  //     {id: 5, name: 'admin', character: '管理员', equipmentID: '003629303232330B473334', operate: '登录系统成功',
  //       operateIP: '127.0.0.1', operateTime: '2017-04-17 09:35:18', details: '这里是用户五的日志详情' },
  //     {id: 6, name: 'admin', character: '管理员', equipmentID: '003629303232330B473334', operate: '登录系统成功',
  //       operateIP: '127.0.0.1', operateTime: '2017-04-17 09:35:18', details: '这里是用户六的日志详情' },
  //     {id: 7, name: 'admin', character: '管理员', equipmentID: '003629303232330B473334', operate: '登录系统成功',
  //       operateIP: '127.0.0.1', operateTime: '2017-04-17 09:35:18', details: '这里是用户七的日志详情' },
  //     {id: 8, name: 'admin', character: '管理员', equipmentID: '003629303232330B473334', operate: '登录系统成功',
  //       operateIP: '127.0.0.1', operateTime: '2017-04-17 09:35:18', details: '这里是用户八的日志详情' },
  //   ];
  //   return {logs};
  // }
//   createDb() {
//     let configurations = [
//       {id: 1, name: '时间配置', features: '0x90', start: '0x68', IMEI: '08 60 96 50 31 88 61 49',
//         mark: '0x10', details: '哈哈哈哈哈哈哈11111111', dataLength: '0x15', functionCode: '0x12',
//         time: '0x20170306112256', CRC8: '0x56', end: '0x16' },
//       {id: 2, name: '定位配置', features: '0x90',  start: '0x68', IMEI: '08 60 96 50 31 88 61 49',
//         mark: '0x10', details: '哈哈哈哈哈哈哈11111111', dataLength: '0x15', functionCode: '0x12',
//         time: '0x20170306112256', CRC8: '0x56', end: '0x16', positionMode: '0x00', interval: '0x0000' },
//       {id: 3, name: '电子围栏配置', features: '0x90', mark: '0x10', time: '0x20170306112256',  details: '哈哈哈哈哈哈哈11111111', type: '0x01',
//         dataLength: '0x15', functionCode: '0x12', interval: '0x0000', parameters: '0x00000005',
// longitude: '42D9D33D', latitude: '4208EC3C',
//         CRC8: '0x56', end: '0x16', positionMode: '0x00', IMEI: '08 60 96 50 31 88 61 49', start: '0x68'},
//       {id: 4, name: '亲情号配置', features: '0x90', mark: '0x10', details: '333333333哈哈哈哈哈哈哈', time: '0x20170306112256', start: '0x68',
//         count: '01 50 03 86 12 46', dataLength: '0x15', functionCode: '0x12', CRC8: '0x56', end: '0x16'},
//       {id: 5, name: '白名单配置', features: '0x90', mark: '0x10', details: '44444444444哈哈哈哈哈哈哈', time: '0x20170306112256',
//         dataLength: '0x15', functionCode: '0x12', interval: '0x0000', count: 5, switchs: '0x04',
//         CRC8: '0x56', end: '0x16', IMEI: '08 60 96 50 31 88 61 49', start: '0x68'},
//       {id: 6, name: '运动配置', features: '0x90', mark: '0x10', details: '5555555555哈哈哈哈哈哈哈', time: '0x20170306112256', start: '0x68',
//         dataLength: '0x15', functionCode: '0x12', CRC8: '0x56', end: '0x16', control: '0x00', IMEI: '08 60 96 50 31 88 61 49'
//       },
//       {id: 7, name: '心率配置', features: '0x90', mark: '0x10', details: '666666666哈哈哈哈哈哈哈', time: '0x20170306112256', start: '0x68',
//         IMEI: '08 60 96 50 31 88 61 49', dataLength: '0x15', functionCode: '0x12', CRC8: '0x56', end: '0x16', control: '0x00',
//         detactionMode: '0x00', max: '0xFF', min: '0x3c'},
//       {id: 8, name: 'IP和端口配置', features: '0x90', mark: '0x10', details: '7777777777哈哈哈哈哈哈哈', time: '0x20170306112256', start: '0x68',
//         IMEI: '08 60 96 50 31 88 61 49', dataLength: '0x15', functionCode: '0x12', CRC8: '0x56', end: '0x16'},
//       {id: 9, name: '心跳配置', features: '0x90', mark: '0x10', details: '888888888哈哈哈哈哈哈哈', time: '0x20170306112256',
//         start: '0x68', IMEI: '08 60 96 50 31 88 61 49', dataLength: '0x15', functionCode: '0x12', CRC8: '0x56', end: '0x16',
//         responce: '0x01', sos: '0x00'},
//       {id: 10, name: '闹钟配置', features: '0x90', mark: '0x10', details: '999999999哈哈哈哈哈哈哈', time: '0x20170306112256',
//         start: '0x68', datapack: '', clockCount: '0x03', IMEI: '08 60 96 50 31 88 61 49', dataLength: '0x15',
//         functionCode: '0x12', CRC8: '0x56', end: '0x16'
//       },
//       {id: 11, name: 'wifi配置', features: '0x90', mark: '0x10', details: '0000000000哈哈哈哈哈哈哈', time: '0x20170306112256',
//         start: '0x68', datapack: '', MAC: 'b0-48-7a-67-2e-ab', nameLength: '0x05', username: 'admin', psdLength: '0x06', psd: '123456',
//         IMEI: '08 60 96 50 31 88 61 49', dataLength: '0x15', functionCode: '0x12', CRC8: '0x56', end: '0x16'
//       },
//       {id: 12, name: '提醒配置', features: '0x90', mark: '0x10', details: '01010101010101哈哈哈哈哈哈哈', time: '0x20170306112256',
//         start: '0x68', datapack: '', nameLength: '0x05', username: 'admin', psdLength: '0x06', psd: '123456',
//         IMEI: '08 60 96 50 31 88 61 49', dataLength: '0x15', functionCode: '0x12', CRC8: '0x56', end: '0x16', alertMode: '1',
//         alertTimeLength: '0x32', alertCount: '0x0A', alertTime: '0x05'
//       },
//       {id: 13, name: '信息推送', features: '0x90', dataLength: '0x15', mark: '0x10', details: '01010101010101哈哈哈哈哈哈哈',
// time: '0x20170306112256',
//         start: '0x68', msgLength: 2, msg: '0x75355B5056F4680F8DA754C', IMEI: '08 60 96 50 31 88 61 49',
//         functionCode: '0x12', CRC8: '0x56', end: '0x16'
//       },
//     ];
//     return {configurations};
//   }
}

