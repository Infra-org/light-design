<Description>
      <Text type='desc'>
           动作表单是一个显示一组选项的对话框，她由覆盖全屏的背景蒙层和位于蒙层之上的内容层组成，一般出现在应用程序的底部。她必须由用户手动关闭，然后才能恢复与应用程序的交互。
      </Text>
      <Text type='title'>使用场景</Text>
      <ul>
            <li>分享内容到到若干社交媒体。</li>
            <li>对目标对象下达指定操作。</li>
            <li>展示内容，并提供相关可能的选项。</li>
      </ul>
</Description>

| 属性 | 说明 | 类型 | 默认值 | 必填 | 版本 |
| - | - | - | - | - | - |
| visible | 是否可见 | boolean | false | 否 | 1.0.0 |
| title | 标题 | string | '' | 否 | 1.0.0 |
| list | 数据项 | Array`<List>` | [] | 是 | 1.0.0 |
| scroll | 横向显示 | boolean | false | 否 | 1.0.0 |
| vertical | 纵向显示 | boolean | false | 否 | 1.0.0 |
| textOnly | 仅有文字 | boolean | false | 否 | 1.0.0 |
| visibleCancel | 显示取消 | boolean | false | 否 | 1.0.0 |
| column | 列数 | number | 3 | 否 | 1.0.0 |
| zIndex | 层级 | number | 100 | 否 | 1.0.0 |

<Title>list</Title>

| 值 | 说明 | 版本 |
| - | - | - |
| name | 名称 | 1.0.0 |
| icon | 图标链接 | 1.0.0 |
| button | 是否为按钮 | 1.0.0 |
| openType | 同小程序open-type | 1.0.0 |
| sessionFrom | 同小程序open-type | 1.0.0 |
| sessionFrom | 同小程序sessionFrom | 1.0.0 |
| sendMessageTitle | 同小程序send-message-title | 1.0.0 |
| sendMessagePath | 同小程序send-messagePath | 1.0.0 |
| sendMessageImg | 同小程序sendMessageImg | 1.0.0 |
| appParameter | 同小程序appParameter | 1.0.0 |
| showMessageCard | 同小程序showMessageCard | 1.0.0 |

<Title>types</Title>

```typescript
type List = {
      name:string
      icon:string
      button?: boolean
      openType?: string
      sessionFrom?: string
      sendMessageTitle?: string
      sendMessagePath?: string
      sendMessageImg?: string
      appParameter?: string
      showMessageCard?: boolean
}
```

<Description type='warning'>
      仅当 list item 的 button 设定为 true 时，button 相关的属性才生效。 
</Description>

<Title>triggerEvents</Title>

```typescript
// 点击列表项时触发
onSelectedPeriod:(
      {
            detail: {
                  index
            }:{
                  index：number
            }
      }
)=>void

// 展示时触发
onShow:()=>void

// 隐藏时触发
onClose:()=>void

getuserinfo (e: WechatMiniprogram.TouchEvent<WechatMiniprogram.ButtonGetUserInfo>) {
	this.triggerEvent('getuserinfo', e)
}

contact (e: WechatMiniprogram.TouchEvent<WechatMiniprogram.ButtonContact>) {
      this.triggerEvent('contact', e)
}

getphonenumber (
      e: WechatMiniprogram.TouchEvent<WechatMiniprogram.ButtonGetPhoneNumber>
) {
      this.triggerEvent('getphonenumber', e)
}

error (e: WechatMiniprogram.TouchEvent<WechatMiniprogram.ButtonError>) {
      this.triggerEvent('error', e)
}

opensetting (e: WechatMiniprogram.TouchEvent<WechatMiniprogram.ButtonOpenSetting>) {
      this.triggerEvent('opensetting', e)
}

launchapp (e: WechatMiniprogram.TouchEvent<WechatMiniprogram.ButtonLaunchApp>) {
      this.triggerEvent('launchapp', e)
}
```

<Title>默认效果</Title>

```html
<ActionSheet
      visible="{{visible_default}}"
      title="分享"
      list="{{list}}"
></ActionSheet>
```

<Title>没有标题</Title>

```html
<ActionSheet
      visible="{{visible_default}}"
      list="{{list}}"
></ActionSheet>
```

<Title>横向滚动</Title>

```html
<ActionSheet
      visible="{{visible_scroll}}"
      title="分享"
      list="{{list}}"
      scroll
></ActionSheet>
```

<Title>纵向显示</Title>

```html
<ActionSheet
      visible="{{visible_scroll}}"
      list="{{list}}"
      vertical
></ActionSheet>
```

<Title>仅有文字</Title>

```html
<ActionSheet
      visible="{{visible_textOnly}}"
      title="分享"
      list="{{list}}"
      vertical
      textOnly
      visibleCancel
></ActionSheet>
```

<Title>显示取消</Title>

```html
<ActionSheet
      visible="{{visible_visibleCancel}}"
      list="{{list}}"
      vertical
      visibleCancel
></ActionSheet>
```

<Title>列数</Title>

```html
<ActionSheet
      visible="{{visible_column}}"
      title="分享"
      list="{{list}}"
      column="{{4}}"
></ActionSheet>
```

<Title>分享功能</Title>

```html
<ActionSheet
      visible="{{visible_share}}"
      title="分享"
      list="{{list_share}}"
      bind:onOption="onAction"
></ActionSheet>
```

<Title>获取手机号</Title>

```html
<ActionSheet
      visible="{{visible_getPhoneNumber}}"
      title="获取手机号"
      list="{{list_getPhoneNumber}}"
      bind:getphonenumber="getphonenumber"
></ActionSheet>
```