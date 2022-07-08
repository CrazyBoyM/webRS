import { DEFAULT_LAYOUT } from '@/router/constants';
import { AppRouteRecordRaw } from '../types';

const rskit: AppRouteRecordRaw = {
  path: '/rskit',
  name: 'rskit',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.rskit',
    requiresAuth: true,
    icon: 'icon-star',
    order: 0,
  },
  children: [
    {
      path: 'road',
      name: 'Road',
      component: () => import('@/views/rskit/road/index.vue'),
      meta: {
        locale: 'menu.rskit.road',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'part',
      name: 'Rart',
      component: () => import('@/views/rskit/part/index.vue'),
      meta: {
        locale: 'menu.rskit.part',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'object-check',
      name: 'ObjectCheck',
      component: () => import('@/views/rskit/object/index.vue'),
      meta: {
        locale: 'menu.rskit.object',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'change',
      name: 'Change',
      component: () => import('@/views/rskit/change/index.vue'),
      meta: {
        locale: 'menu.rskit.change',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default rskit;
