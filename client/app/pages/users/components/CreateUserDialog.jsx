import React, { useState, useEffect, useCallback } from "react";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import Alert from "antd/lib/alert";
import DynamicForm from "@/components/dynamic-form/DynamicForm";
import { wrap as wrapDialog, DialogPropType } from "@/components/DialogWrapper";
import recordEvent from "@/services/recordEvent";
import { useUniqueId } from "@/lib/hooks/useUniqueId";

const formFields = [
  { required: true, name: "name", title: "名称", type: "text", autoFocus: true },
  { required: true, name: "email", title: "邮箱", type: "email" },
];

function CreateUserDialog({ dialog }) {
  const [error, setError] = useState(null);
  useEffect(() => {
    recordEvent("view", "page", "users/new");
  }, []);

  const handleSubmit = useCallback(values => dialog.close(values).catch(setError), [dialog]);
  const formId = useUniqueId("userForm");

  return (
    <Modal
      {...dialog.props}
      title="创建新用户"
      footer={[
        <Button key="cancel" {...dialog.props.cancelButtonProps} onClick={dialog.dismiss}>
          取消
        </Button>,
        <Button
          key="submit"
          {...dialog.props.okButtonProps}
          htmlType="submit"
          type="primary"
          form={formId}
          data-test="SaveUserButton">
          创建
        </Button>,
      ]}
      wrapProps={{
        "data-test": "CreateUserDialog",
      }}>
      <DynamicForm id={formId} fields={formFields} onSubmit={handleSubmit} hideSubmitButton />
      {error && <Alert message={error.message} type="error" showIcon data-test="CreateUserErrorAlert" />}
    </Modal>
  );
}

CreateUserDialog.propTypes = {
  dialog: DialogPropType.isRequired,
};

export default wrapDialog(CreateUserDialog);
