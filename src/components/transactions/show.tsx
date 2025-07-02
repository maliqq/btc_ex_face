import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import { useState } from "react";

import { useRecoilState, useRecoilValue } from 'recoil';

import {
  Card,
  Text,
  Flex,
  Grid,
  DataList,
  Code,
  Badge,
  Heading,
  Button,
} from "@radix-ui/themes";
import {
  ArrowBigLeft,
} from 'lucide-react';

import { API_BASE_URL } from "@/lib/constants";
import { get_transaction } from '@/lib/atoms';

import './styles.css';

const Amount = ({children}) => <Text size="3" weight="bold">{children}</Text>;

const Component = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const transaction= useRecoilValue(get_transaction(id));
  return (
    <Card m="5">
      <Flex align="center" justify="between">
        <Heading>Checkout</Heading>

        <Button variant="soft" onClick={ () => navigate('/new') }><ArrowBigLeft /> Back</Button>
      </Flex>

      <DataList.Root columns={{initial: "6", md: 10}}>
        <DataList.Item>
          <DataList.Label>You send</DataList.Label>
          <DataList.Value>
            <Flex direction="column">
              <Amount>{transaction.from_amount_str}</Amount>
              <Text color="grass" weight="bold">blockchain: omni layer</Text>
            </Flex>
          </DataList.Value>
        </DataList.Item>

        <DataList.Item>
          <DataList.Label>You get</DataList.Label>
          <DataList.Value>
            <Flex direction="column">
              <Amount>~ {transaction.to_amount_str}</Amount>
              <Text color="grass" weight="bold">blockchain: bitcoin</Text>
            </Flex>
          </DataList.Value>
        </DataList.Item>

        <DataList.Item>
          <DataList.Label>Exchange fee</DataList.Label>
          <DataList.Value>
            <Flex direction="column">
              <Amount>{transaction.exchange_fee_str}</Amount>
              <Text color="gray">This exchange fee is already included in the displayed amount you'll get</Text>
            </Flex>
          </DataList.Value>
        </DataList.Item>

        <DataList.Item>
          <DataList.Label>Network fee</DataList.Label>
          <DataList.Value>
            <Flex direction="column">
              <Amount>{transaction.network_fee_str}</Amount>
              <Text color="gray">This network fee is already included in the displayed amount you'll get</Text>
            </Flex>
          </DataList.Value>
        </DataList.Item>

        <DataList.Item>
          <DataList.Label>Recipient Address</DataList.Label>
          <DataList.Value>
            <Flex direction="column">
              <Code>{transaction.to_address}</Code>
            </Flex>
          </DataList.Value>
        </DataList.Item>

        <DataList.Item>
          <DataList.Label>Exchange rate</DataList.Label>
          <DataList.Value>
            <Flex direction="column">
              <Amount>1 USDT ~ {transaction.exchange_rate} BTC</Amount>
            </Flex>
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>
    </Card>
  );
};

export default Component;
