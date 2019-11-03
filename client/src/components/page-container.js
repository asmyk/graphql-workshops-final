import React, { Fragment } from 'react';
import styled from 'react-emotion';

import { unit, colors } from '../styles';
import Header from './header'

export default function PageContainer(props) {
  return (
    <Fragment>
    <Header/>
      <Container>{props.children}</Container>
    </Fragment>
  );
}

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  width: '100%',
  margin: '0 auto',
  padding: unit * 3,
  paddingBottom: unit * 5,
});
