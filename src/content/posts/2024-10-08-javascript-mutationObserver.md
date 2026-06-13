---
title: JavaScript 中的 `MutationObserver` notes
date: 2024-10-08 22:53:00 +0800
categories: Development
---

### JavaScript 中的 `MutationObserver` 笔记

#### 简要介绍
`MutationObserver` 是 JavaScript 提供的一个用于监控 DOM 变化的接口。它能够监听 DOM 树中节点的添加、删除，属性的修改，以及文本内容的变化。与传统的事件监听器相比，`MutationObserver` 更精确、更高效，因此在实时监控页面内容时非常实用。更棒的是，现代浏览器都已经很好地支持它，因此可以放心地在绝大多数 Web 应用中使用。

`MutationObserver` 的优势主要有：
- **异步监控**：它不会阻塞主线程，可以提高页面的性能。
- **精细化监控**：可根据需求监控不同类型的 DOM 变化，比如子节点、属性、文本内容等。
- **灵活性**：通过配置项，开发者可以精确指定要监视的变化类型。

#### 基本用法
使用 `MutationObserver` 一般分为三步：
1. 创建一个 `MutationObserver` 实例，并传入一个回调函数。
2. 使用 `observe()` 方法开始监视目标节点，并传入一个配置对象来指定要监视的变化类型。
3. 通过 `disconnect()` 方法停止观察（可选）。

**示例代码**

下面的示例演示了如何使用 `MutationObserver` 监听某个 DOM 元素子节点的变化：
```javascript
// 1. 创建一个 MutationObserver 实例
const observer = new MutationObserver((mutationsList, observer) => {
  mutationsList.forEach(mutation => {
    console.log('Mutation type:', mutation.type);
    if (mutation.type === 'childList') {
      console.log('A child node has been added or removed.');
    } else if (mutation.type === 'attributes') {
      console.log('The ' + mutation.attributeName + ' attribute was modified.');
    }
  });
});

// 2. 选择需要观察的目标节点
const targetNode = document.getElementById('myElement');

// 3. 配置观察选项
const config = {
  childList: true, // 监听子节点的变化
  attributes: true, // 监听属性的变化
  subtree: true, // 监听目标节点以及其后代的变化
};

// 4. 开始观察
observer.observe(targetNode, config);

// 示例：动态添加一个子节点以触发观察
const newChild = document.createElement('div');
targetNode.appendChild(newChild);

// 5. 断开观察（可选）
observer.disconnect();
```

#### mutation.type 的值详解

`MutationObserver` 的回调函数会接收到一个包含所有变化的 `mutationsList` 数组。每个变化对象（`mutation`）都有一个 `type` 属性，表示变化的类型。主要有以下几种：

1. **`childList`**
   - 表示子节点发生了变化，比如添加、删除或重新排序子节点。注意，这种变化只关注子节点的增删，而不涉及它们的属性或文本内容变化。
   - **使用场景**：检测元素内部的子节点何时被添加或移除。
   - **相关属性**：
     - `mutation.addedNodes`：返回一个 `NodeList`，包含所有新增的子节点。
     - `mutation.removedNodes`：返回一个 `NodeList`，包含所有被移除的子节点。
   - **示例**：
     ```javascript
     if (mutation.type === 'childList') {
       console.log('Child nodes have been added or removed.');
       console.log('Added nodes:', mutation.addedNodes);
       console.log('Removed nodes:', mutation.removedNodes);
     }
     ```

2. **`attributes`**
   - 表示目标节点的属性发生了变化，比如 `class`、`id` 或 `style` 等属性的修改。
   - **使用场景**：当某个元素的属性变化时，执行特定的逻辑。
   - **相关属性**：
     - `mutation.attributeName`：返回发生变化的属性名称。
   - **示例**：
     ```javascript
     if (mutation.type === 'attributes') {
       console.log(`The ${mutation.attributeName} attribute was modified.`);
     }
     ```

3. **`subtree`**
   - 这不是 `mutation.type` 的一种值，而是观察选项的一部分。设置 `subtree: true` 可以监控目标节点及其所有子孙节点的变化。
   - **示例**：
     ```javascript
     observer.observe(targetNode, { attributes: true, childList: true, subtree: true });
     ```

4. **`characterData`**
   - 用于监测目标节点的文本内容变化，比如直接修改元素的 `textContent` 或 `nodeValue`。
   - **使用场景**：监控某个元素内部的文本内容变化。
   - **相关属性**：
     - `mutation.oldValue`：返回变化前的文本内容（需要在配置选项中设置 `characterDataOldValue: true` 才能获取）。
   - **示例**：
     ```javascript
     if (mutation.type === 'characterData') {
       console.log('Text content was modified.');
       console.log('Old text content:', mutation.oldValue);
     }
     ```

#### 使用场景
`MutationObserver` 的主要使用场景包括：

1. **监控动态内容变化**：在页面中异步加载内容或用户输入时使用。
   
2. **属性或样式变化监控**：实时反馈用户交互，例如当某个元素的 `class` 属性发生变化时，触发相应逻辑。

3. **子节点增删监控**：开发富交互式的 Web 应用时，常常需要监听 DOM 的子节点变化，`MutationObserver` 可以精确监控节点的添加和删除。

4. **替代 DOM 事件**：在某些场景下，标准 DOM 事件（如 `input`、`change`）无法满足需求，而 `MutationObserver` 提供了更强大的监控能力。

5. **性能优化**：相比传统的轮询方式，`MutationObserver` 采用异步回调机制，更加高效。

#### 总结
`MutationObserver` 是一个强大的 API，用于高效监听 DOM 树中的变化。通过异步的方式，它可以捕获节点的增删、属性的变化、文本内容的修改，为开发者提供更多的交互可能性。合理使用 `MutationObserver`，能让 Web 应用更加灵活和高效。不过，在使用时也要注意配置合理的观察选项，以免带来不必要的性能消耗。