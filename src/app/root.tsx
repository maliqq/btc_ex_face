import React from "react";

import { Outlet } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import { Flex, Spinner } from '@radix-ui/themes';

import DefaultLayout from '@/components/layouts/default';

const Root = () => {
  return (
    <RecoilRoot>
      <DefaultLayout>
        <React.Suspense fallback={<Flex gap="2" p="5" align="center"><Spinner />Loading...</Flex>}>
          <Outlet />
        </React.Suspense>
      </DefaultLayout>
    </RecoilRoot>
  );
};

export default Root;
