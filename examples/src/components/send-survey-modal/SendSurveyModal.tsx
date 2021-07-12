import React from 'react';
import Modal from "antd/lib/modal/Modal";
import { notification } from 'antd';
import { sendFeedbackSurvey } from '../../services/survey/survey-service';

export const useSurveySender = () => {
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [recipients, setRecipients] = React.useState([]);
    const sendSurvey = async (recipients: string[]) => {
        setVisible(true);
        setRecipients(recipients);
    }

    const handleOk = async () => {
        setConfirmLoading(true);
        const messageLink = await sendFeedbackSurvey(recipients);
        notification['success']({
            message: 'Survey Sent!',
            description:
                `The survey will be sent to the recipients within the next 5 minutes. You can click on this notification to manage this.`,
            onClick: () => {
                window.open(messageLink, '_blank');
            }
        });
        setConfirmLoading(false);
        setVisible(false);
    }

    const handleCancel = () => {
        setVisible(false);
    }

    const modalJSX = <Modal
        title="Send survey"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}>
        Are you sure you want to send the survey to these {recipients.length} customers ?
    </Modal>

    return {
        sendSurvey,
        modalJSX
    }
}