tbt-react-heatmap
=================
__Show your heatmap just by a few lines!__

A heatmap react component with a background image, if you want 😎.

# How it will look like
## 4x3 heatmap
![4x3 heatmap sample](./sample-images/4x3-heatmap-sample.png)

## 4x3 heatmap with background image
![4x3 heatmap sample with bg](./sample-images/4x3-dancer-sample.png)

# How to use
```js
import { Heatmap } from "tbt-react-heatmap";

const twelve = [
    [30, 70, 200],
    [40, 110.5, 170],
    [80.5, 100.23, 123.45],
    [250.23, 50.4, 245],
];

const render = () =>
    <Heatmap
        height={244}
        width={244}
        opacity={0.7}
        heatmapArray={twelve}
        src="sample-images/dancer-sample.png"
    />
```

# LICENSE MEMO
* [The background image of dancer-sample.png](https://svgsilh.com/image/294258.html): Creative Commons CC0
