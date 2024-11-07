import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import NameConfirmationDialog from '@/components/NameConfirmationDialog/NameConfirmationDialog';
import { getUserById } from '@/lib/actions/user.actions';
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    redirect('/sign-in');
  }

  const userData = await getUserById(session.user.id);
  const user = JSON.parse(JSON.stringify(userData));

  return (
    <main className='h-dvh'>
      <NameConfirmationDialog user={user}/>
    </main>
  )
}

export default Dashboard