import React from 'react';
import { useRouter } from 'next/router';
import { Nav, INavStyles, INavLinkGroup } from '@fluentui/react';
import { basePath } from '../../next.config';

const resolvePath = (path: string): string => `${basePath}${path}`;

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
        url: resolvePath('/timeline'),
        key: 'timeline',
      },
      {
        name: '文章',
        url: resolvePath('/posts'),
        key: 'posts',
      },
      {
        name: '豆腐',
        url: resolvePath('/tofu'),
        key: 'tofu',
      },
    ],
  },
];

const navStyles: Partial<INavStyles> = {
  root: {
    overflowY: 'auto',
  },
};

const Menu: React.FunctionComponent = () => {
  const router = useRouter();
  const { asPath } = router;
  return (
    <Nav
      selectedKey={asPath.split('/')[1]}
      ariaLabel="网站导航"
      styles={navStyles}
      groups={navLinkGroups}
    />
  );
};

Menu.propTypes = {};

export default Menu;
