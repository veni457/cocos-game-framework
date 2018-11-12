const { ccclass, property } = cc._decorator
const C = {
    TOOLIP: {
        PREFAB: '需要添加的prefab',
        PLAY_ONLOAD: '是否在onLoad()时自动添加；默认自动添加',
        RESET_POSITION: '是否初始化位置为(0,0)',
    },
}
Object.freeze(C)

/**
 * [framework-T] 游戏开始时添加prefab
 */
@ccclass
export default class TAddPrefab extends cc.Component {

    /**
     * 获取当前node下被AddPrefab脚本添加的prefab节点
     * - 此方法仅仅适用于脚本上只有一个TAddPrefab组件的情况
     * @param node 
     */
    static get_prefab_node(node: cc.Node): cc.Node {
        return node.getComponent(TAddPrefab).prefab_node
    }

    /** @type {cc.Prefab} 需要添加的prefab */
    @property({ tooltip: C.TOOLIP.PREFAB, type: cc.Prefab })
    prefab: cc.Prefab = null

    /** @type {boolean} 是否在onLoad时自动添加 */
    @property({ tooltip: C.TOOLIP.PLAY_ONLOAD })
    is_play_onload: boolean = true

    /** @type {boolean} 是否重置位置为0 */
    @property({ tooltip: C.TOOLIP.RESET_POSITION })
    is_reset_position: boolean = true

    /** prefab创建成功后对应的node */
    prefab_node: cc.Node

    onLoad() {
        if (this.is_play_onload) {
            this.add_prefab()
        }
    }

    /**
     * 添加prefab到游戏场景中
     * @param is_reset_position
     * @param prefab 
     * @param parent_node 
     */
    add_prefab(is_reset_position: boolean = this.is_reset_position, prefab = this.prefab, parent_node = this.node): cc.Node {
        let n = cc.instantiate(prefab)
        n.setParent(parent_node)
        n.position = is_reset_position ? cc.Vec2.ZERO : n.position
        return n
    }
}