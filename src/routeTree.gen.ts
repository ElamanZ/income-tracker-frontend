/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthImport } from './routes/_auth'
import { Route as AppImport } from './routes/_app'
import { Route as IndexImport } from './routes/index'
import { Route as AuthSignupImport } from './routes/_auth/signup'
import { Route as AuthSigninImport } from './routes/_auth/signin'
import { Route as AppTransactionsIndexImport } from './routes/_app/transactions/index'
import { Route as AppSettingsIndexImport } from './routes/_app/settings/index'
import { Route as AppDebtsIndexImport } from './routes/_app/debts/index'
import { Route as AppCategoriesIndexImport } from './routes/_app/categories/index'
import { Route as AppBalanceIndexImport } from './routes/_app/balance/index'

// Create/Update Routes

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const AppRoute = AppImport.update({
  id: '/_app',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthSignupRoute = AuthSignupImport.update({
  id: '/signup',
  path: '/signup',
  getParentRoute: () => AuthRoute,
} as any)

const AuthSigninRoute = AuthSigninImport.update({
  id: '/signin',
  path: '/signin',
  getParentRoute: () => AuthRoute,
} as any)

const AppTransactionsIndexRoute = AppTransactionsIndexImport.update({
  id: '/transactions/',
  path: '/transactions/',
  getParentRoute: () => AppRoute,
} as any)

const AppSettingsIndexRoute = AppSettingsIndexImport.update({
  id: '/settings/',
  path: '/settings/',
  getParentRoute: () => AppRoute,
} as any)

const AppDebtsIndexRoute = AppDebtsIndexImport.update({
  id: '/debts/',
  path: '/debts/',
  getParentRoute: () => AppRoute,
} as any)

const AppCategoriesIndexRoute = AppCategoriesIndexImport.update({
  id: '/categories/',
  path: '/categories/',
  getParentRoute: () => AppRoute,
} as any)

const AppBalanceIndexRoute = AppBalanceIndexImport.update({
  id: '/balance/',
  path: '/balance/',
  getParentRoute: () => AppRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_app': {
      id: '/_app'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AppImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_auth/signin': {
      id: '/_auth/signin'
      path: '/signin'
      fullPath: '/signin'
      preLoaderRoute: typeof AuthSigninImport
      parentRoute: typeof AuthImport
    }
    '/_auth/signup': {
      id: '/_auth/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof AuthSignupImport
      parentRoute: typeof AuthImport
    }
    '/_app/balance/': {
      id: '/_app/balance/'
      path: '/balance'
      fullPath: '/balance'
      preLoaderRoute: typeof AppBalanceIndexImport
      parentRoute: typeof AppImport
    }
    '/_app/categories/': {
      id: '/_app/categories/'
      path: '/categories'
      fullPath: '/categories'
      preLoaderRoute: typeof AppCategoriesIndexImport
      parentRoute: typeof AppImport
    }
    '/_app/debts/': {
      id: '/_app/debts/'
      path: '/debts'
      fullPath: '/debts'
      preLoaderRoute: typeof AppDebtsIndexImport
      parentRoute: typeof AppImport
    }
    '/_app/settings/': {
      id: '/_app/settings/'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof AppSettingsIndexImport
      parentRoute: typeof AppImport
    }
    '/_app/transactions/': {
      id: '/_app/transactions/'
      path: '/transactions'
      fullPath: '/transactions'
      preLoaderRoute: typeof AppTransactionsIndexImport
      parentRoute: typeof AppImport
    }
  }
}

// Create and export the route tree

interface AppRouteChildren {
  AppBalanceIndexRoute: typeof AppBalanceIndexRoute
  AppCategoriesIndexRoute: typeof AppCategoriesIndexRoute
  AppDebtsIndexRoute: typeof AppDebtsIndexRoute
  AppSettingsIndexRoute: typeof AppSettingsIndexRoute
  AppTransactionsIndexRoute: typeof AppTransactionsIndexRoute
}

const AppRouteChildren: AppRouteChildren = {
  AppBalanceIndexRoute: AppBalanceIndexRoute,
  AppCategoriesIndexRoute: AppCategoriesIndexRoute,
  AppDebtsIndexRoute: AppDebtsIndexRoute,
  AppSettingsIndexRoute: AppSettingsIndexRoute,
  AppTransactionsIndexRoute: AppTransactionsIndexRoute,
}

const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren)

interface AuthRouteChildren {
  AuthSigninRoute: typeof AuthSigninRoute
  AuthSignupRoute: typeof AuthSignupRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthSigninRoute: AuthSigninRoute,
  AuthSignupRoute: AuthSignupRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthRouteWithChildren
  '/signin': typeof AuthSigninRoute
  '/signup': typeof AuthSignupRoute
  '/balance': typeof AppBalanceIndexRoute
  '/categories': typeof AppCategoriesIndexRoute
  '/debts': typeof AppDebtsIndexRoute
  '/settings': typeof AppSettingsIndexRoute
  '/transactions': typeof AppTransactionsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthRouteWithChildren
  '/signin': typeof AuthSigninRoute
  '/signup': typeof AuthSignupRoute
  '/balance': typeof AppBalanceIndexRoute
  '/categories': typeof AppCategoriesIndexRoute
  '/debts': typeof AppDebtsIndexRoute
  '/settings': typeof AppSettingsIndexRoute
  '/transactions': typeof AppTransactionsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_app': typeof AppRouteWithChildren
  '/_auth': typeof AuthRouteWithChildren
  '/_auth/signin': typeof AuthSigninRoute
  '/_auth/signup': typeof AuthSignupRoute
  '/_app/balance/': typeof AppBalanceIndexRoute
  '/_app/categories/': typeof AppCategoriesIndexRoute
  '/_app/debts/': typeof AppDebtsIndexRoute
  '/_app/settings/': typeof AppSettingsIndexRoute
  '/_app/transactions/': typeof AppTransactionsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/signin'
    | '/signup'
    | '/balance'
    | '/categories'
    | '/debts'
    | '/settings'
    | '/transactions'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/signin'
    | '/signup'
    | '/balance'
    | '/categories'
    | '/debts'
    | '/settings'
    | '/transactions'
  id:
    | '__root__'
    | '/'
    | '/_app'
    | '/_auth'
    | '/_auth/signin'
    | '/_auth/signup'
    | '/_app/balance/'
    | '/_app/categories/'
    | '/_app/debts/'
    | '/_app/settings/'
    | '/_app/transactions/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AppRoute: typeof AppRouteWithChildren
  AuthRoute: typeof AuthRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AppRoute: AppRouteWithChildren,
  AuthRoute: AuthRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_app",
        "/_auth"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_app": {
      "filePath": "_app.tsx",
      "children": [
        "/_app/balance/",
        "/_app/categories/",
        "/_app/debts/",
        "/_app/settings/",
        "/_app/transactions/"
      ]
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/signin",
        "/_auth/signup"
      ]
    },
    "/_auth/signin": {
      "filePath": "_auth/signin.tsx",
      "parent": "/_auth"
    },
    "/_auth/signup": {
      "filePath": "_auth/signup.tsx",
      "parent": "/_auth"
    },
    "/_app/balance/": {
      "filePath": "_app/balance/index.tsx",
      "parent": "/_app"
    },
    "/_app/categories/": {
      "filePath": "_app/categories/index.tsx",
      "parent": "/_app"
    },
    "/_app/debts/": {
      "filePath": "_app/debts/index.tsx",
      "parent": "/_app"
    },
    "/_app/settings/": {
      "filePath": "_app/settings/index.tsx",
      "parent": "/_app"
    },
    "/_app/transactions/": {
      "filePath": "_app/transactions/index.tsx",
      "parent": "/_app"
    }
  }
}
ROUTE_MANIFEST_END */
