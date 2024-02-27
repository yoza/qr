import React from "react";


export const ACCESS_TOKEN_COOKIE = "access_token";
export const maxFileSize = 5242880; /* (maximum size allowed ) */
export const userKey = "user";


export interface MenuItem {
  text: string;
  path: string;
  icon?: string;
  style?: React.CSSProperties,
  targetSegment?: string;
  hide?: boolean;
}

export const menuItems: MenuItem[] = [
  {
    text: 'Главная',
    path: "/",
    hide: true
  },
  {
    text: 'Рецепты',
    path: "/recipes",
    targetSegment: "recipes"
  },
  {
    text: 'Поиск',
    path: "/"
  },
  {
    text: 'Категории',
    path: "/"
  },
  {
    text: 'Комментарии',
    path: "/",
    hide: true
  },
  {
    text: 'О нас',
    path: "/"
  }
];

export const userMenuItems: MenuItem[] = [
  {
    text: 'Profile',
    path: "/profile",
    targetSegment: "profile",
  },
  {
    text: 'Sign out',
    path: "/",
    targetSegment: "signout",
  },
]
