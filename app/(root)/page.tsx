import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getLoggedInUser } from '@/lib/actions/user.action'
import React from 'react'

const Home = async () => {
  const loggedInUser = await getLoggedInUser();
  return (
    <section className='home'>
        <div className='home-content'>
            <header className='home-header'>
              <HeaderBox 
              type='greeting'
              title='Welcome'
              user={loggedInUser?.name || "Guest"}
              subtext='Access and manage your account and transaction efficiently.' />

              <TotalBalanceBox
              accounts={[]}
              totalBanks={1}
              totalCurrentBalance={1250.35}/>
            </header>
            Recent Transactions
        </div>
        <RightSidebar
        user={loggedInUser}
        transaction={[]}
        banks={[{currentBalance: 2565.45}, {currentBalance: 7525.05}]}/>
    </section>
  )
}

export default Home