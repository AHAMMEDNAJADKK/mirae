import React from 'react';
import SpatialSequence, { spatialSequenceData } from './SpatialSequence';

export { SpatialSequence, spatialSequenceData };
export const studioImages = spatialSequenceData;

export default function StudioScrollSection() {
  return <SpatialSequence />;
}

