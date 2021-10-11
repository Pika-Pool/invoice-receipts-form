import { nanoid } from 'nanoid/non-secure';
import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

export const InvoiceFormContext = createContext();

export function useInvoiceForm() {
	return useContext(InvoiceFormContext);
}

const defaultItem = {
	id: nanoid(),
	itemName: '',
	quantity: 1,
	pricePerItem: 1,
	discount: 0,
	GST: 18,
};

export default function InvoiceFormProvider({ children }) {
	const { control, handleSubmit, ...otherUseFormProps } = useForm({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		defaultValues: {
			buyerName: '',
			buyerContactNumber: '',
			transactionDate: new Date(),
			items: [],
		},
	});

	const { append, fields, remove } = useFieldArray({
		control,
		name: 'items',
		keyName: 'fieldKey',
		shouldUnregister: false,
	});

	const appendItem = useCallback(
		() => append({ ...defaultItem, id: nanoid() }),
		[append],
	);
	const cancelCurrentItem = useCallback(
		() => remove(fields.length - 1),
		[remove, fields],
	);
	const currentItemIndex = useMemo(() => fields.length - 1, [fields]);

	return (
		<InvoiceFormContext.Provider
			value={{
				control,
				handleSubmit,
				appendItem,
				cancelCurrentItem,
				currentItemIndex,
				removeItem: remove,
				...otherUseFormProps,
			}}
		>
			{children}
		</InvoiceFormContext.Provider>
	);
}
