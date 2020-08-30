import React from 'react'
// import PropTypes from 'prop-types'
// import Link from 'next/link'
import { Nav, INavStyles, INavLinkGroup } from '@fluentui/react';

const navLinkGroups: INavLinkGroup[] = [
  {
    links: [
      {
        name: 'Home',
        url: '/blog/home',
        key: 'key0',
        isExpanded: true,
      },
      {
        name: 'Timeline',
        url: '/blog/timeline',
        key: 'key1',
      },
      {
        name: 'Post',
        url: '/blog/post',
        key: 'key2',
      },
      {
        name: 'Tofu',
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
      selectedKey="key0"
      ariaLabel="Nav basic example"
      styles={navStyles}
      groups={navLinkGroups}
    />
  );
}

Menu.propTypes = {

}

export default Menu
