import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

/**
 * Custom Input Element
 * TextInput props may be passed
 */
const InputElement = React.forwardRef(
	({ label, error, prefix, suffix, ...textInputProps }, ref) => {
		console.log({ error });
		return (
			<View style={styles.container}>
				<Text style={styles.label}>{label}</Text>

				<View style={styles.inputGroup}>
					{prefix && <Text style={styles.inputGroupPrefix}>{prefix}</Text>}
					<TextInput style={styles.input} {...textInputProps} ref={ref} />
					{suffix && <Text style={styles.inputGroupSuffix}>{suffix}</Text>}
				</View>

				<Text style={styles.error}>{error?.message}</Text>
			</View>
		);
	},
);

export default InputElement;

export const styles = StyleSheet.create({
	container: {
		paddingBottom: 3,
	},
	label: {
		color: 'black',
		fontSize: 17,
		fontWeight: 'bold',
	},
	inputGroup: {
		flexDirection: 'row',
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 5,
		marginTop: 5,
		marginBottom: 3,
	},
	input: {
		fontSize: 20,
		color: 'black',
		padding: 10,
	},
	inputGroupPrefix: {
		fontSize: 20,
		color: 'black',
		borderRightColor: 'black',
		borderRightWidth: 1,
		padding: 10,
	},
	inputGroupSuffix: {
		fontSize: 20,
		color: 'black',
		borderLeftColor: 'black',
		borderLeftWidth: 1,
		padding: 10,
	},
	error: {
		color: 'red',
		fontStyle: 'italic',
		fontSize: 15,
	},
});
