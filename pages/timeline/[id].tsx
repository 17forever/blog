import React from 'react'
import PropTypes from 'prop-types'
import { getTimelineFileList, getTimelineData } from '../../lib/getTimeline'
import TimelineLayout from './layout'

export default function Timeline(props) {
  const { paths, data, id } = props
  return (
    <>
      <TimelineLayout data={paths} value={id}>
        {
          data.map(
            item => {
              const { date, weather, mood, body } = item
              return (
                <>
                  {date}
                  {weather}
                  {mood}
                  {body}
                </>
              )
            }
          )
        }
      </TimelineLayout>
    </>
  );
}

Timeline.propTypes = {

}

export async function getStaticProps({ params }) {
  const data = getTimelineData(params.id)
  const paths = getTimelineFileList().map(item => item.params.id)
  return {
    props: {
      ...data,
      paths
    }
  }
}

export async function getStaticPaths() {
  const paths = getTimelineFileList()
  return {
    paths,
    fallback: false
  }
}
