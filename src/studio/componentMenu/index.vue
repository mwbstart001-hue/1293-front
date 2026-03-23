<template>
  <div class="component-menu">
    <div class="menu-header">
      <Icon type="ios-apps" size="18" />
      <span>组件库</span>
    </div>
    <div class="menu-body">
      <!-- 容器组件分组 -->
      <div class="menu-group">
        <div class="group-title" @click="containerCollapsed = !containerCollapsed">
          <Icon :type="containerCollapsed ? 'ios-arrow-forward' : 'ios-arrow-down'" size="14" />
          <span>容器组件</span>
          <span class="group-count">{{ containerList.length }}</span>
        </div>
        <transition name="fade-slide">
          <div v-show="!containerCollapsed" class="group-body">
            <draggable
              :list="containerList"
              :group="{ name: 'components', pull: 'clone', put: false }"
              :clone="cloneComponent"
              :sort="false"
              :animation="200"
              ghostClass="menu-ghost"
              class="component-list"
            >
              <div
                class="component-card"
                v-for="item in containerList"
                :key="item.tag"
              >
                <div class="card-icon">
                  <Icon :type="item.icon || 'ios-cube'" size="22" />
                </div>
                <div class="card-name">{{ item.componentName }}</div>
              </div>
            </draggable>
          </div>
        </transition>
      </div>

      <!-- 基础组件分组 -->
      <div class="menu-group">
        <div class="group-title" @click="widgetCollapsed = !widgetCollapsed">
          <Icon :type="widgetCollapsed ? 'ios-arrow-forward' : 'ios-arrow-down'" size="14" />
          <span>基础组件</span>
          <span class="group-count">{{ widgetList.length }}</span>
        </div>
        <transition name="fade-slide">
          <div v-show="!widgetCollapsed" class="group-body">
            <draggable
              :list="widgetList"
              :group="{ name: 'components', pull: 'clone', put: false }"
              :clone="cloneComponent"
              :sort="false"
              :animation="200"
              ghostClass="menu-ghost"
              class="component-list"
            >
              <div
                class="component-card"
                v-for="item in widgetList"
                :key="item.tag"
              >
                <div class="card-icon">
                  <Icon :type="item.icon || 'ios-cube'" size="22" />
                </div>
                <div class="card-name">{{ item.componentName }}</div>
              </div>
            </draggable>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import containerConfig from './container.json'
import widgetConfig from './widget.json'
import { deepClone } from '@/utils/utils'

export default {
  name: 'ComponentMenu',
  components: { draggable },
  data() {
    return {
      containerList: deepClone(containerConfig),
      widgetList: deepClone(widgetConfig),
      containerCollapsed: false,
      widgetCollapsed: false
    }
  },
  methods: {
    cloneComponent(item) {
      return deepClone(item)
    }
  }
}
</script>

<style scoped>
.component-menu {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--bg-sidebar);
  color: var(--text-primary);
  overflow: hidden;
}

.menu-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 20px;
  font-size: 15px;
  font-weight: 600;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
  letter-spacing: 0.5px;
}

.menu-body {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
}

.menu-group {
  margin-bottom: 8px;
}

.group-title {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 12px;
  cursor: pointer;
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  transition: all var(--transition-fast);
  user-select: none;
}

.group-title:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
}

.group-count {
  margin-left: auto;
  background: rgba(45, 140, 240, 0.15);
  color: var(--primary-color);
  font-size: 11px;
  padding: 1px 8px;
  border-radius: 10px;
  font-weight: 600;
}

.group-body {
  padding: 4px 0;
}

.component-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  padding: 4px;
}

.component-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 14px 8px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: grab;
  transition: all var(--transition-normal);
  user-select: none;
}

.component-card:hover {
  background: var(--bg-card-hover);
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(45, 140, 240, 0.15);
}

.component-card:active {
  cursor: grabbing;
  transform: translateY(0);
}

.card-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(45, 140, 240, 0.1), rgba(45, 140, 240, 0.2));
  border-radius: var(--radius-md);
  color: var(--primary-color);
}

.card-name {
  font-size: 12px;
  color: var(--text-secondary);
  text-align: center;
  line-height: 1.2;
}

.menu-ghost {
  opacity: 0.5;
  background: var(--primary-light) !important;
}

/* 动画 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s ease;
}
.fade-slide-enter,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
