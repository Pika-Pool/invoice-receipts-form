import React from 'react';
import InvoiceFormProvider from './InvoiceFormProvider';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InvoiceScreen from './InvoiceScreen';
import InvoiceItemFormScreen from './InvoiceItemFormScreen';

const { Navigator, Screen } = createNativeStackNavigator();

export const rootNavigationScreens = {
	invoice: 'Invoice',
	addItem: 'Add Item',
	receipt: 'Receipt',
};

const App = () => {
	return (
		<InvoiceFormProvider>
			<NavigationContainer>
				<Navigator initialRouteName={rootNavigationScreens.invoice}>
					<Screen
						name={rootNavigationScreens.invoice}
						component={InvoiceScreen}
					/>
					<Screen
						name={rootNavigationScreens.addItem}
						component={InvoiceItemFormScreen}
					/>
				</Navigator>
			</NavigationContainer>
		</InvoiceFormProvider>
	);
};

export default App;
