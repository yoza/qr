import * as React from 'react';
import { useFormControlContext } from '@mui/base/FormControl';
import clsx from 'clsx';


// eslint-disable-next-line react/display-name
export const Label = React.forwardRef<HTMLLabelElement, { className?: string; children?: React.ReactNode }>
  (({ className: classNameProp, children }, ref) => {
    const formControlContext = useFormControlContext();
    const [dirty, setDirty] = React.useState(false);

    React.useEffect(() => {
      if (formControlContext?.filled) {
        setDirty(true);
      }
    }, [formControlContext]);

    if (formControlContext === undefined) {
      return <p className={clsx('text-sm mb-1', classNameProp)}>{children}</p>;
    }

    const { error, required, filled, value, focused } = formControlContext;
    const showRequiredError = dirty && required && !filled;

    return (value || focused ?
      <label
        ref={ref}
      /* htmlFor={ } */
      /*  className={focused ? 'text-ellipsis text-blue-500 absolute left-0 top-0' : ''} */
      >
        <span

          className={clsx(
            'text-sm mb-1',
            classNameProp,
            error || showRequiredError ? 'invalid text-red-500' : '',
          )}
        >
          {children}
          {required ? ' *' : ''}
        </span>
      </label>
      : <span className='text-sm mb-1'>&nbsp;</span>
    );
  });

// eslint-disable-next-line react/display-name
export const HelperText = React.forwardRef<HTMLParagraphElement, { className?: string, children?: React.ReactNode }>(
  (props, ref) => {
    const { className, children, ...other } = props;
    const formControlContext = useFormControlContext();
    const [dirty, setDirty] = React.useState(false);

    React.useEffect(() => {
      if (formControlContext?.filled) {
        setDirty(true);
      }
    }, [formControlContext]);

    if (formControlContext === undefined) {
      return null;
    }

    const { error, required, filled } = formControlContext;
    const showRequiredError = dirty && required && !filled;

    return error || showRequiredError ? (
      <p
        ref={ref}
        className={
          clsx(
            'text-sm pl-4',
            className,
            error || showRequiredError ? 'invalid text-red-500' : '',
          )}

        {...other} >
        {children}
        {required ? ' *' : ''}
      </p>
    ) : <p className={clsx('text-sm', className)}>&nbsp;</p>;
  },
);
