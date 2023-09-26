import React from "react";
import { BottomSheetModal, BottomSheetModalProps } from "@gorhom/bottom-sheet";
import Backdrop from "../Backdrop";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import theme from "../../config/theme";
import { ThemeType } from "../../types";
import { StyleSheet } from "react-native";
import useStyles from "../../hooks/useStyles";

const AppBottomSheet = React.forwardRef(
	(
		props: { closeBottomsheet: () => void } & BottomSheetModalProps,
		ref: React.Ref<BottomSheetModalMethods>
	) => {
		const { styles } = useStyles(createStyles);

		return (
			<BottomSheetModal
				ref={ref}
				index={0}
				backgroundStyle={styles.background}
				handleIndicatorStyle={styles.indicator}
				backdropComponent={(backdropProps) => (
					<Backdrop onPress={props.closeBottomsheet} {...backdropProps} />
				)}
				{...props}
			>
				{props.children}
			</BottomSheetModal>
		);
	}
);

export default AppBottomSheet;

const createStyles = (theme: ThemeType) =>
	StyleSheet.create({
		background: {
			backgroundColor: "#111010",
			borderRadius: 32,
		},
		indicator: {
			backgroundColor: theme.border,
			width: 60,
		},
	});
