<template>
  <div class="component-menu">
    <div class="menu-header">
      <Icon type="ios-cube" size="18" />
      <span>组件库</span>
    </div>
    
    <div class="menu-content">
      <Collapse v-model="activeNames" simple>
        <Panel v-for="category in categories" :key="category.name" :name="category.name">
          <div class="category-title">
            <Icon :type="category.icon" size="16" />
            <span>{{ category.label }}</span>
          </div>
          <div slot="content" class="component-list">
            <draggable
              v-model="categoryComponents[category.name]"
              :group="{ name: 'components', pull: 'clone', put: false }"
              :sort="false"
              :clone="cloneComponent"
              class="draggable-list"
            >
              <div
                v-for="component in categoryComponents[category.name]"
                :key="component.tag"
                class="component-item"
                :data-tag="component.tag"
              >
                <div class="component-icon">
                  <Icon :type="component.icon" size="24" />
                </div>
                <div class="component-info">
                  <div class="component-name">{{ component.name }}</div>
                  <div class="component-desc">{{ component.description }}</div>
                </div>
              </div>
            </draggable>
          </div>
        </Panel>
      </Collapse>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { componentCategories, componentList, createComponentInstance } from '@/config/componentConfig'
import { generateUUID } from '@/utils/uuid'

export default {
  name: 'ComponentMenu',
  components: {
    draggable
  },
  data() {
    return {
      activeNames: ['container', 'basic'],
      categories: componentCategories
    }
  },
  computed: {
    categoryComponents() {
      const result = {}
      this.categories.forEach(category => {
        result[category.name] = componentList.filter(
          item => item.componentType === category.name
        )
      })
      return result
    }
  },
  methods: {
    cloneComponent(component) {
      const uuid = generateUUID()
      const instance = createComponentInstance(component.tag, uuid)
      return {
        ...instance,
        _isClone: true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.component-menu {
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e8e8e8;

  .menu-header {
    height: 48px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    border-bottom: 1px solid #e8e8e8;
    font-weight: 600;
    font-size: 14px;
    color: #333;
    gap: 8px;
  }

  .menu-content {
    flex: 1;
    overflow-y: auto;
    padding: 8px;

    .category-title {
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: 500;
    }

    .component-list {
      .draggable-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .component-item {
        display: flex;
        align-items: center;
        padding: 12px;
        background: #f5f7fa;
        border-radius: 6px;
        cursor: move;
        transition: all 0.2s ease;
        border: 1px solid transparent;

        &:hover {
          background: #e6f7ff;
          border-color: #1890ff;
          transform: translateX(4px);
        }

        .component-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          border-radius: 6px;
          margin-right: 12px;
          color: #1890ff;
        }

        .component-info {
          flex: 1;

          .component-name {
            font-size: 14px;
            font-weight: 500;
            color: #333;
            margin-bottom: 4px;
          }

          .component-desc {
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>
