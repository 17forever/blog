// @ts-nocheck
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getTimelineFileList } from '../../lib/getTimeline';
import TimelineLayout from './layout';

export default function TimeLineIndex(props) {
  const { paths } = props;
  return <TimelineLayout data={paths} />;
}

TimeLineIndex.propTypes = {};

export async function getStaticProps() {
  return {
    props: {
      paths: getTimelineFileList().map((item) => item.params.id),
    },
  };
}
