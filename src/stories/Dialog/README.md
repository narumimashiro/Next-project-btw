# Dialogのカスタムコンポーネント作成にあたって

### DialogのWrapコンポーネント

```Ts
const displayDialog = open ? 'dialog-visible' : 'dialog-hidden'

return (
  <div className={styles[displayDialog]}>
    <div className={styles[`overlay-${colorTheme}`]}>
      <div className={`absolute-center ${styles[`dialog-${colorTheme}`]}`}>

      </div>
    </div>
  </div>
)
```

### Dialogの共通スタイル

上記ラップコンポーネントのスタイリング

```scss
// dialog common style

$border-radius-px: 4px;

.dialog-visible {
  display: block;
}

.dialog-hidden {
  display: none;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
}

.overlay-light {
  @extend .overlay;
  background: rgba(0, 0, 0, 0.5);
}

.overlay-dark {
  @extend .overlay;
  background: rgba(0, 0, 0, 0.3);
}

.dialog-light {
  background: #FFFFFF;
  color: #000000;
  border-radius: $border-radius-px;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: 0px 6px 9px -5px rgba(0,0,0,0.2), 0px 12px 17px 2px rgba(0,0,0,0.14), 0px 5px 25px 4px rgba(0,0,0,0.12);
}

.dialog-dark {
  background: #000000;
  color: #FFFFFF;
  border-radius: $border-radius-px;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: 0px 6px 9px -5px rgba(255,255,255,0.5), 0px 12px 17px 2px rgba(255,255,255,0.34), 0px 5px 25px 4px rgba(255,255,255,0.32);
}
```