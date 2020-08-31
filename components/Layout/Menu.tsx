import React from 'react'
// import PropTypes from 'prop-types'
// import Link from 'next/link'
import { Nav, INavStyles, INavLinkGroup } from '@fluentui/react';

const navLinkGroups: INavLinkGroup[] = [
  {
    links: [
      // {
      //   name: 'Home',
      //   url: '/blog/',
      //   key: 'key0',
      //   isExpanded: true,
      // },
      {
        name: '时光轴',
        url: '/blog/timeline',
        key: 'key1',
      },
      {
        name: '文章',
        url: '/blog/post',
        key: 'key2',
      },
      {
        name: '豆腐',
        url: '/blog/tofu',
        key: 'key3'
      }
    ],
  },
];

const navStyles: Partial<INavStyles> = {
  root: {
    overflowY: 'auto',
  },
};

const Menu: React.FunctionComponent = () => {
  return (
    <Nav
      // onLinkClick={_onLinkClick}
      selectedKey="key1"
      ariaLabel="网站导航"
      styles={navStyles}
      groups={navLinkGroups}
    />
  );
}

Menu.propTypes = {

}

export default Menu
