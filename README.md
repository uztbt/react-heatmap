tbt-react-heatmap
=================
An HTML5 canvas based heatmap react component.

__Show your heatmap just by a few lines!__

# How it will look like
## 4x3 heatmap
![4x3 heatmap sample](./sample-images/4x3-heatmap-sample.png)

## 4x3 heatmap with background image
![4x3 heatmap sample with bg](./sample-images/dancer-sample.png)
Note that the overlay is achieved by another CSS file, using the class name fed to the Heatmap component.

# How to use
```js
import * as h from "tbt-react-heatmap";

const twelve = [
    [30, 70, 200],
    [40, 110.5, 170],
    [80.5, 100.23, 123.45],
    [250.23, 50.4, 245],
]

const render = () =>
    <h.Heatmap
            className="coveringCanvas"
            height={244}
            width={244}
            style={{opacity: 1.0}}
            heatmapArray={twelve}
    />
```

# LICENSE MEMO
* [The background image of dancer-sample.png](https://svgsilh.com/image/294258.html): Creative Commons CC0
