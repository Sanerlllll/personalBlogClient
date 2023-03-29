import getComponentRootDom from "./getComponentRootDom";//导入获取组件根节点的方法
import Icon from '@/components/Icon';//导入Icon组件
import styles from './showMessage.module.less';

/**
 * 弹出消息
 * @param {*} content 消息内容
 * @param {*} type    消息类型 info（普通消息） error success warn
 * @param {*} duration 弹窗多久后消失
 * @param {*} container 容器：消息会显示到消息的中间，如果不传，则显示到页面组件
 */
export default function(options={}){
    const content = options.content || "";
    const type = options.type || "info";
    const duration = options.duration || 2000;
    const container = options.container || document.body;
    // 创建消息元素
    const div = document.createElement("div");
    const iconDom = getComponentRootDom(Icon,{type});
    // console.log(iconDom,iconDom.outerHTML);
    div.innerHTML =   `<span class=${styles.icon}>${iconDom.outerHTML}</span><div>${content}</div>`;
    // console.log(div)
    // console.log(styles['message']);
    // 设置div样式
    div.className = `${styles.message} ${styles[`message-${type}`]}`;
    // 将div添加到container中
    if(options.container){
        // 判断容器的position是否有改动过
        if(getComputedStyle(container).position === 'static'){
            container.style.position = 'relative';
        }
    }
    container.appendChild(div);
    div.clientHeight;  //会导致reflow，使其强行渲染一次div
    // 使div回到正常位置
    div.style.opacity = 1;
    div.style.transform = `translate(-50%,-50%)`;

    // div等待一段时间后消失
    setTimeout(() => {
        div.style.opacity = 0;
        div.style.transform = `translate(-50%,-50%) translateY(-25px)`;
        div.addEventListener('transitionend',function(){
            div.remove();
            // 如果options传了回调函数，则运行回调函数
            options.callback && options.callback();
        },{ once : true });
    },duration);
   
}

