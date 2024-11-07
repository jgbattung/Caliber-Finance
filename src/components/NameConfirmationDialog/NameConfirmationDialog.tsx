"use client"

import { IUser } from '@/lib/models/User'
import React, { useState } from 'react'
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter } from '../ui/dialog';
import { DialogDescription } from '@radix-ui/react-dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface DialogProps {
  user: IUser;
}

function NameConfirmationDialog({ user }: DialogProps) {
  const [showNameDialog, setShowNameDialog] = useState(!user.confirmedName)

  return (
    <div>
      <Dialog
        open={showNameDialog}
        onOpenChange={setShowNameDialog}
        modal={true}
      >
        <DialogContent
          className="[&>button]:hidden"
          onInteractOutside={(e) => {
            e.preventDefault()
          }}
          onEscapeKeyDown={(e) => {
            e.preventDefault()
          }}
          onPointerDownOutside={(e) => {
            e.preventDefault()
          }}
        >
          <DialogHeader>
            <DialogTitle>
              Welcome to Caliber
            </DialogTitle>
            <DialogDescription>
              {`Let's make sure we have your name right. You can update it below.`}
            </DialogDescription>
          </DialogHeader>
          <div>
            <Label htmlFor='firstName'>First Name *</Label>
            <Input
              id="firstName"
              defaultValue={user.firstName}
            />
            <Label htmlFor='lastName'>Last Name</Label>
            <Input
              id="lastName"
              defaultValue={user.lastName ? user.lastName : ''}
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default NameConfirmationDialog