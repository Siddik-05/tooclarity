'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './ProfileHeader.module.css';
import ScheduleCallbackDialog, { CallbackFormData, DialogContentConfig } from '../home/ScheduleCallbackDialog';
import OtpDialogBox from '../../auth/OtpDialogBox';
import { authAPI } from '@/lib/api';
import { toast } from 'react-toastify';
import { useAuth } from '@/lib/auth-context';

interface ProfileHeaderProps {
  name: string;
  email: string;
  avatar?: string;
  contactNumber?: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  email,
  avatar,
  contactNumber,
}) => {
  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const [isCallbackDialogOpen, setIsCallbackDialogOpen] = useState(false);
  const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [dialogContentConfig, setDialogContentConfig] = useState<DialogContentConfig>();
  const { refreshUser } = useAuth();

  const handleCallbackSubmit = async (data: CallbackFormData) => {
    try {
      const { phoneNumber: phoneInput, email } = data;
      const trimmedPhone = (phoneInput || "").trim();
      const trimmedEmail = (email || "").trim();

      if (!trimmedPhone && !trimmedEmail) {
        toast.error("Please provide a phone number or email to verify.");
        return;
      }

      setPhoneNumber(trimmedPhone);
      setEmailAddress(trimmedEmail);

      const response = await authAPI.verifyContactNumberAndEmail({
        contactNumber: trimmedPhone || undefined,
        email: trimmedEmail || undefined,
      });

      if (response?.success) {
        setIsCallbackDialogOpen(false);
        setIsOtpDialogOpen(true);
        const targetLabel = trimmedPhone ? "phone number" : "email";
        toast.success(`OTP sent to ${targetLabel} successfully!`);
      } else {
        toast.error(response?.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error("Something went wrong while sending OTP");
      console.error(error);
    }
  };

  const handleOtpVerificationSuccess = async () => {
    setIsOtpDialogOpen(false);
    await refreshUser();
    toast.success("Verification successful!");
  };

  const openDialog = (config?: DialogContentConfig) => {
    setDialogContentConfig(config);
    setIsCallbackDialogOpen(true);
  };

  const handleEmailDialog = () => {
    openDialog({
      title: 'Verify your email address',
      description: 'Add or update the email linked with your profile.',
      inputLabel: 'Email address',
      placeholder: email,
      submitLabel: 'Submit',
      inputType: 'email',
      inputMode: 'email',
      fieldName: 'email',
      value: email,
      validator: (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return 'Please enter a valid email address';
        }
      },
    });
  };

  const handlePhoneDialog = () => {
    openDialog({
      title: 'Verify your phone number',
      description: 'We use this number to contact you for course updates.',
      placeholder: contactNumber || '9398******',
      submitLabel: 'Submit',
      inputType: 'number',
      fieldName: 'phoneNumber',
      value: contactNumber
    });
  };

  return (
    <>
      <div className={styles.header}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatar}>
          {avatar ? (
            <Image src={avatar} alt={name} width={48} height={48} />
          ) : (
            <span className={styles.initials}>{getInitials(name)}</span>
          )}
        </div>
      </div>
      <div className={styles.userInfo}>
        <h2 className={styles.name}>{name}</h2>
        <div className={styles.emailRow}>
          <p className={styles.email}>{email}</p>
          <button
            className={styles.editBtn}
            onClick={handleEmailDialog}
          >
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.3113 4.62821L14.1216 0.439461C13.9823 0.300137 13.8169 0.189617 13.6349 0.114213C13.4529 0.03881 13.2578 0 13.0608 0C12.8638 0 12.6687 0.03881 12.4867 0.114213C12.3047 0.189617 12.1393 0.300137 12 0.439461L0.439695 11.9998C0.299801 12.1386 0.188889 12.3038 0.113407 12.4858C0.0379245 12.6678 -0.000621974 12.863 7.58901e-06 13.0601V17.2498C7.58901e-06 17.6476 0.158043 18.0291 0.439347 18.3104C0.720652 18.5917 1.10218 18.7498 1.50001 18.7498H17.25C17.4489 18.7498 17.6397 18.6708 17.7803 18.5301C17.921 18.3895 18 18.1987 18 17.9998C18 17.8009 17.921 17.6101 17.7803 17.4694C17.6397 17.3288 17.4489 17.2498 17.25 17.2498H7.81126L18.3113 6.74977C18.4506 6.61048 18.5611 6.44511 18.6365 6.2631C18.7119 6.08109 18.7507 5.886 18.7507 5.68899C18.7507 5.49198 18.7119 5.2969 18.6365 5.11489C18.5611 4.93288 18.4506 4.7675 18.3113 4.62821ZM5.68969 17.2498H1.50001V13.0601L9.75001 4.81009L13.9397 8.99977L5.68969 17.2498ZM15 7.93946L10.8113 3.74977L13.0613 1.49977L17.25 5.68946L15 7.93946Z" fill="#0222D7"/>
            </svg>
          </button>
        </div>
        <div className={styles.emailRow}>
          <p className={styles.email}>{contactNumber}</p>
          <button className={styles.editBtn} onClick={handlePhoneDialog}>
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.3113 4.62821L14.1216 0.439461C13.9823 0.300137 13.8169 0.189617 13.6349 0.114213C13.4529 0.03881 13.2578 0 13.0608 0C12.8638 0 12.6687 0.03881 12.4867 0.114213C12.3047 0.189617 12.1393 0.300137 12 0.439461L0.439695 11.9998C0.299801 12.1386 0.188889 12.3038 0.113407 12.4858C0.0379245 12.6678 -0.000621974 12.863 7.58901e-06 13.0601V17.2498C7.58901e-06 17.6476 0.158043 18.0291 0.439347 18.3104C0.720652 18.5917 1.10218 18.7498 1.50001 18.7498H17.25C17.4489 18.7498 17.6397 18.6708 17.7803 18.5301C17.921 18.3895 18 18.1987 18 17.9998C18 17.8009 17.921 17.6101 17.7803 17.4694C17.6397 17.3288 17.4489 17.2498 17.25 17.2498H7.81126L18.3113 6.74977C18.4506 6.61048 18.5611 6.44511 18.6365 6.2631C18.7119 6.08109 18.7507 5.886 18.7507 5.68899C18.7507 5.49198 18.7119 5.2969 18.6365 5.11489C18.5611 4.93288 18.4506 4.7675 18.3113 4.62821ZM5.68969 17.2498H1.50001V13.0601L9.75001 4.81009L13.9397 8.99977L5.68969 17.2498ZM15 7.93946L10.8113 3.74977L13.0613 1.49977L17.25 5.68946L15 7.93946Z" fill="#0222D7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
      <ScheduleCallbackDialog
        open={isCallbackDialogOpen}
        onOpenChange={setIsCallbackDialogOpen}
        onSubmit={handleCallbackSubmit}
        contentConfig={dialogContentConfig}
      />
      <OtpDialogBox
        open={isOtpDialogOpen}
        setOpen={setIsOtpDialogOpen}
        phoneNumber={phoneNumber || undefined}
        email={emailAddress || undefined}
        onVerificationSuccess={handleOtpVerificationSuccess}
        fromStudent={true}
      />
    </>
  );
};

export default ProfileHeader;