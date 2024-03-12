/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const {visit} = require('unist-util-visit');
const fromEntries = require('object.fromentries');
const {u} = require('unist-builder');
const dedent = require('dedent');

const parseParams = (paramString = '') => {
  const params = fromEntries(new URLSearchParams(paramString));

  if (!params.platform) {
    params.platform = 'web';
  }

  return params;
};

function attr(name, value) {
  return {
    type: 'mdxJsxAttribute',
    name,
    value,
  };
}

async function toJsxNode(node) {
  const params = parseParams(node.meta);
  const name = params.name ? decodeURIComponent(params.name) : 'Example';
  const description = params.description
    ? decodeURIComponent(params.description)
    : 'Example usage';

  const dependencies = encodeURIComponent(params.dependencies || '@rnmu/components');
  const platform = params.platform || 'web';
  const supportedPlatforms = params.supportedPlatforms || 'ios,android,web';
  const theme = params.theme || 'light';
  const preview = params.preview || 'true';
  const loading = params.loading || 'lazy';
  // const deviceAndroid = params.deviceAndroid || 'pixel4';
  // const deviceIos = params.deviceIos || 'iphone12';
  const encodedSampleCode = encodeURIComponent(node.value);
  const jsxNode = {
    type: 'mdxJsxTextElement',
    name: 'div',
    attributes: [
      attr('class', 'snack-player'),
      attr('data-snack-name', name),
      attr('data-snack-description', description),
      attr('data-snack-code', encodedSampleCode),
      attr('data-snack-dependencies', dependencies),
      attr('data-snack-platform', platform),
      attr('data-snack-supported-platforms', supportedPlatforms),
      attr('data-snack-theme', theme),
      attr('data-snack-preview', preview),
      attr('data-snack-loading', loading)
    ],
    children: [],
  };
  Object.keys(node).forEach(key => delete node[key]);
  Object.keys(jsxNode).forEach(key => (node[key] = jsxNode[key]));
}

const SnackPlayer = () => {
  return async tree => {
    const nodesToProcess = [];
    visit(tree, 'code', (node, parent) => {
      if (node.lang === 'SnackPlayer') {
        nodesToProcess.push(toJsxNode(node, parent));
      }
    });
    await Promise.all(nodesToProcess);
  };
};

module.exports = SnackPlayer;