import React from "react";

import {
  Heading,
  Section,
  DataList,
  TextField,
  IconButton,
  DropdownMenu,
  Select,
  Button,
  Checkbox,
  HoverCard,
  Flex, Box, Grid,
  Tooltip,
  Link,
  Text,
  Card
} from "@radix-ui/themes";

import {
  LockOpen, ArrowUpDown, CircleQuestionMark,
} from 'lucide-react';

import './styles.css';

const Component = () => {
  return <Flex direction="column" gap="2" p="5">
    <Card>
      <Flex direction="column" gap="2">
        <Heading size="4">Calculate Amount</Heading>

        <Box as="fieldgroup" className="FieldGroup">
          <Grid columns={{initial: "2", md: "2fr 1fr"}} direction="row" gap="2" align="center">
            <Flex as="label" direction="column" gap="2">
              <Text color="gray" size="1">You send</Text>

              <TextField.Root value="1000" variant="surface"></TextField.Root>
            </Flex>

            <Flex direction="column" gap="2">
              <Text color="gray" size="1">Tether Omni</Text>

              <Select.Root defaultValue="usdt">
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="usdt">USDT</Select.Item>
                </Select.Content>
              </Select.Root>
            </Flex>
          </Grid>
        </Box>

        <Text as="h3" color="gray">
          <Flex align="center" justify="between">
            <Flex align="center" gap="2">
              <LockOpen size="10" />

              <Text>
                1 USDT ~0.00002151 BTC
                &bull;
                All fees
                { ' ' }
                <Link href="/#/help" target="_blank" underline="always" color="green" className="underline decoration-dashed">included</Link>
              </Text>
            </Flex>

            <IconButton radius="full">
              <ArrowUpDown size="16" />
            </IconButton>
          </Flex>
        </Text>

        <Box as="fieldgroup" className="FieldGroup">
          <Grid columns={{initial: "2", md: "2fr 1fr"}} direction="row" gap="2" align="center">
            <Flex as="label" direction="column" gap="2">
              <Text color="gray" size="1">You get</Text>

              <TextField.Root value="1000" variant="surface">
                <TextField.Slot>~</TextField.Slot>
              </TextField.Root>
            </Flex>

            <Flex direction="column" gap="2">
              <Text color="gray" size="1">BTC</Text>

              <Select.Root defaultValue="btc">
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="btc">BTC</Select.Item>
                </Select.Content>
              </Select.Root>
            </Flex>
          </Grid>
        </Box>
      </Flex>
    </Card>

    <Card>
      <DataList.Root>
        <DataList.Item align="center">
          <DataList.Label minWidth="88px">Exchange fee 0.25%</DataList.Label>
          <DataList.Value>
            <Text weight="bold">0.000005379 BTC</Text>
          </DataList.Value>
        </DataList.Item>

        <DataList.Item align="center">
          <DataList.Label minWidth="88px">Network fee 0.25%</DataList.Label>
          <DataList.Value>
            <Text weight="bold">0.0005 BTC</Text>
          </DataList.Value>
        </DataList.Item>

        <DataList.Item align="center">
          <DataList.Label minWidth="88px">Estimated arrival</DataList.Label>
          <DataList.Value>
            <Text weight="bold">5-30 min</Text>
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>
    </Card>

    <Card>
      <Flex direction="column" gap="2">
        <Heading size="4">Wallet Address</Heading>

        <Grid as="fieldgroup" direction="row" gap="5" className="FieldGroup" align="center" columns="1fr auto">
          <Flex as="label" direction="column" gap="2">
            <Text color="gray" size="1">Recipient address</Text>
            <TextField.Root placeholder="Enter your BTC recipient address"></TextField.Root>
          </Flex>

          <HoverCard.Root>
            <HoverCard.Trigger>
              <CircleQuestionMark size="16" />
            </HoverCard.Trigger>
            <HoverCard.Content>
              Enter P2PKH, P2SH, or P2WPHK address
            </HoverCard.Content>
          </HoverCard.Root>
        </Grid>

        <Text as="label">
          <Flex gap="2" align="center">
            <Checkbox />
            <Text>I agree with Terms of Use, Privacy Policy and AML/KYC</Text>
          </Flex>
        </Text>

        <Button size="3" color="green">Next step</Button>
      </Flex>
    </Card>
  </Flex>;
};

export default Component;
