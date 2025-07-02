import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilState, useRecoilValue } from 'recoil';

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
  HoverCard, Callout,
  Flex, Box, Grid,
  Tooltip,
  Link,
  Text,
  Card
} from "@radix-ui/themes";

import { API_BASE_URL } from "@/lib/constants";
import { new_transaction, recalculated_transaction } from '@/lib/atoms';

import {
  LockOpen, ArrowUpDown, CircleQuestionMark, CircleAlert
} from 'lucide-react';

import './styles.css';

const Error = ({msg}: { msg: string[] | string | null |undefined }) => {
  if (!msg) return null;

  return (
    <Callout.Root color="red" mt="2" size="1">
      <Callout.Icon><CircleAlert size="16" /></Callout.Icon>
      <Callout.Text>{Array.isArray(msg) && msg[0] || msg}</Callout.Text>
    </Callout.Root>
  )
}

const Component = () => {
  const navigate = useNavigate();

  const [transaction, setTransaction] = useRecoilState(new_transaction);

  const [debouncedAmount, setDebouncedAmount] = useState(transaction.from_amount);
  useEffect(() => {
    const handler = setTimeout(() => {
      if (debouncedAmount != transaction.from_amount) {
        setTransaction({ ...transaction, from_amount: debouncedAmount});
      }
    }, 3000);

    return () => clearTimeout(handler);
  }, [debouncedAmount]);

  const calculated = useRecoilValue(recalculated_transaction(transaction.from_amount));
  const [errors, setErrors] = useState({});
  const [isSaving, setSaving] = useState(false);

  const setProperty = (name) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (name == 'from_amount') setDebouncedAmount(value);
    else setTransaction({ ...transaction, [name]: value});
  };
  const setValue = <T extends string>(name) => (value: T) => {
    setTransaction({ ...transaction, [name]: value});
  };
  const setChecked = (name) => (value: boolean) =>{
    setTransaction({ ...transaction, [name]: value});
  };

  const handleSubmit = () => {
    setSaving(true);

    const data = { transaction };
    axios.post(`${API_BASE_URL}/api/v1/transactions`, data).then(async (resp) => {
      setSaving(false);
      setErrors({});
      navigate(`/txn/${resp.data.id}`)
    }).catch((e) => {
      setSaving(false);
      if (e.response.status == 422) {
        setErrors(e.response.data.errors);
      }

      // TODO: handle 500
    });;
  }

  return <Flex direction="column" gap="2" p="5">
    <Card>
      <Flex direction="column" gap="2">
        <Heading size="4">Calculate Amount</Heading>

        <Box as="fieldgroup" className="FieldGroup">
          <Grid columns={{initial: "2", md: "2fr 1fr"}} direction="row" gap="2" align="center">
            <Flex as="label" direction="column" gap="2">
              <Text color="gray" size="1">You send</Text>

              <TextField.Root
                variant="surface" type="number" step="0.01"
                value={debouncedAmount} onChange={setProperty('from_amount')}
              ></TextField.Root>
            </Flex>

            <Flex direction="column" gap="2">
              <Text color="gray" size="1">Tether Omni</Text>

              <Select.Root defaultValue="USDT" onValueChange={setValue('from_amount_currency')}>
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="USDT">USDT</Select.Item>
                </Select.Content>
              </Select.Root>
            </Flex>
          </Grid>
          <Error msg={errors.amount} />
        </Box>

        <Text as="h3" color="gray">
          <Flex align="center" justify="between">
            <Flex align="center" gap="2">
              <LockOpen size="10" />

              <Text>
                1 USDT ~{calculated.exchange_rate} BTC
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

              <TextField.Root readonly value={calculated.to_amount.cents / Math.pow(10, 8)} variant="surface">
                <TextField.Slot>~</TextField.Slot>
              </TextField.Root>
            </Flex>

            <Flex direction="column" gap="2">
              <Text color="gray" size="1">BTC</Text>

              <Select.Root defaultValue="BTC" onValueChange={setValue('to_currency')}>
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="BTC">BTC</Select.Item>
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
          <DataList.Label minWidth="88px">Exchange fee {parseFloat(calculated.exchange_fee_rate) * 100}%</DataList.Label>
          <DataList.Value>
            <Text weight="bold">{calculated.exchange_fee_str}</Text>
          </DataList.Value>
        </DataList.Item>

        <DataList.Item align="center">
          <DataList.Label minWidth="88px">Network fee</DataList.Label>
          <DataList.Value>
            <Text weight="bold">{calculated.network_fee_str}</Text>
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

        <Grid as="fieldgroup" direction="row" gap="2" className="FieldGroup" align="center" columns="1fr auto">
          <Flex as="label" direction="column" gap="2">
            <Text color="gray" size="1">Recipient address</Text>
            <TextField.Root placeholder="Enter your BTC recipient address" style={{minWidth: '40pt'}}
              value={transaction.to_address}
              onChange={ setProperty('to_address') }
            ></TextField.Root>
            <Error msg={errors.to_address} />
          </Flex>

          <HoverCard.Root>
            <HoverCard.Trigger>
              <CircleQuestionMark size="16" />
            </HoverCard.Trigger>
            <HoverCard.Content>
              Enter P2PKH, P2SH, or P2WPHK address
            </HoverCard.Content>
          </HoverCard.Root>

          <Flex as="label" direction="column" gap="2">
            <Text color="gray" size="1">E-mail</Text>
            <TextField.Root placeholder="Enter your e-mail" style={{minWidth: '40pt'}}
              value={transaction.email}
              onChange={ setProperty('email') }
            ></TextField.Root>

            <Error msg={errors.email} />
          </Flex>
        </Grid>

        <Text as="label">
          <Flex gap="2" align="center">
            <Checkbox onCheckedChange={ setChecked('terms_accepted') } />
            <Text>I agree with Terms of Use, Privacy Policy and AML/KYC</Text>
          </Flex>
          <Error msg={errors.terms_accepted} />
        </Text>

        <Button disabled={isSaving} size="3" color="green" onClick={ handleSubmit }>Next step</Button>
      </Flex>
    </Card>
  </Flex>;
};

export default Component;
