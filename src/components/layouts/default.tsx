import React from 'react';
import { Theme, Flex, Box, Link } from '@radix-ui/themes';

import { useNavigate } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import { new_transaction } from '@/lib/atoms';

import logo from '/logo.svg';

import {
  ClipboardPen, ArrowLeftRight, CircleQuestionMark, Cog,
} from 'lucide-react';

import './styles.css';

const Component = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const resetNewTransaction = useResetRecoilState(new_transaction);

  const navigateNewTransaction = () => {
    resetNewTransaction();
    navigate('/new');
  };

  return (
    <Theme>
      <Flex className="Container">
        <Flex className="Side" p={{initial: "2", md: "4"}}>
          <Box mb={{initial: "0", md: "4"}} className="Logo">
            <a href="/#/" style={{cursor: 'pointer'}} title="Exchange USDT&rarr;BTC" onClick={ (e) => { e.prevenDefault(); navigate('/') } }>
              <img src={logo} />
            </a>
          </Box>

          <Link style={{cursor: 'pointer'}} className="NavLink" color="orange" onClick={ navigateNewTransaction }><Flex gap="1" align="center">
            <ArrowLeftRight size="16" /> <Box display={{initial: "none", md: "inline-block"}}>New Exchange</Box>
          </Flex></Link>

          <Link style={{cursor: 'pointer'}} className="NavLink" onClick={ () => navigate('/help') }><Flex gap="1" align="center">
            <CircleQuestionMark size="16" /> <Box display={{initial: "none", md: "inline-block"}}>Help</Box>
          </Flex></Link>
        </Flex>

        <Flex direction="column" className="Main" align="start">
          {children}
        </Flex>
      </Flex>  
    </Theme>
  );
};

export default Component;
