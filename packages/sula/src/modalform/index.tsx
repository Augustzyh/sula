import React from 'react';
import assign from 'lodash/assign';
import InnerModalForm from './ModalForm';
import InnerDrawerForm from './DrawerForm';
import { RopeActionResult, STOP } from '../rope';

export interface RefModalProps {
  type: 'modal' | 'drawer';
}

export interface ModalProps {
  title: string | React.ReactElement;
}

const RefModalForm: React.FC<RefModalProps> = ({ type }, ref) => {
  const [resetCount, setResetCount] = React.useState(0);
  const [visible, setVisible] = React.useState<boolean>(false);
  const modalRef = React.useRef<any>({});
  const modal = modalRef.current;

  modal.show = (props: ModalProps) => {
    return new Promise((resolve, reject) => {
      setVisible(true);
      setResetCount(resetCount + 1);
      modal.props = props;

      modal.close = (result: RopeActionResult | any) => {
        setVisible(false);
        // 终止调用链
        if (result === STOP) {
          reject(STOP);
        } else {
          resolve(result);
        }
      };
    });
  };

  React.useImperativeHandle(ref, () => {
    return {
      show: modal.show,
    };
  });

  return React.createElement(type === 'drawer' ? InnerDrawerForm : InnerModalForm, {
    key: resetCount,
    visible,
    modal,
  });
};

const ModalForm = React.forwardRef(RefModalForm);

export default ModalForm;
