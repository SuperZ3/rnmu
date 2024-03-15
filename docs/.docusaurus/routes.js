import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '33a'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '1d4'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '786'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '622'),
            routes: [
              {
                path: '/docs/components/button',
                component: ComponentCreator('/docs/components/button', 'e26'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', 'aed'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'dab'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
