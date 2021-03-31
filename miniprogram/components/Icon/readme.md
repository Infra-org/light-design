| 属性 | 说明 | 类型 | 默认值 | 必填 | 版本 |
| - | - | - | - | - | - |
| icon | 图标 | Icon | {} | 是 | 1.0.0 |
| type | 样式 | 'outline' or 'filled' | 'outline' | 否 | 1.0.0 |
| size | 大小 | number | 20 | 否 | 1.0.0 |
| color | 颜色 | string | '#000000' | 否 | 1.0.0 |
| visibleWrap | 包裹 | boolean | false | 否 | 1.0.0 |
| bordered | 边框 | boolean | false | 否 | 1.0.0 |
| filled | 填充 | boolean | false | 否 | 1.0.0 |
| round | 圆形 | boolean | false | 否 | 1.0.0 |
| borderColor | 边框颜色 | string | 'whitesmoke' | 否 | 1.0.0 |
| fillColor | 填充颜色 | string | 'whitesmoke' | 否 | 1.0.0 |

<Title>默认效果</Title>

```html
<Icon
      icon="{{toggle}}"
      color="black"
      size="{{30}}"
></Icon>
```

<Title>样式</Title>

```html
<Icon
      icon="{{toggle}}"
      color="black"
      size="{{30}}"
      type="filled"
></Icon>
```

<Title>颜色</Title>

```html
<Icon
      icon="{{cube}}"
      color="red"
      size="{{40}}"
      type="filled"
></Icon>
```

<Title>渐变色</Title>

```html
<Icon
      icon="{{cube}}"
      color="linear-gradient(to right,red,purple)"
      size="{{40}}"
      type="filled"
></Icon>
```

<Title>大小</Title>

```html
<Icon
      icon="{{cube}}"
      color="black"
      size="{{20}}"
      type="filled"
></Icon>
```

<Title>包裹</Title>

```html
<Icon
      icon="{{cube}}"
      color="black"
      size="{{30}}"
      type="filled"
      visibleWrap
      filled
></Icon>
```

<Title>包裹样式</Title>

```html
<Icon
      icon="{{cube}}"
      color="black"
      size="{{30}}"
      type="filled"
      borderColor="black"
      visibleWrap
      bordered
      round
></Icon>
```