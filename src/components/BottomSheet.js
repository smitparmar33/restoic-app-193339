// THIS IS PATCH CUZ BOTTOM SHEET HAS A BUG //
import React, {useRef} from 'react'; // "react": "16.9.0"
import Animated from 'react-native-reanimated'; // "react-native-reanimated": "~1.7.0"
import BottomSheet from 'reanimated-bottom-sheet'; // "reanimated-bottom-sheet": "^1.0.0-alpha.20"
const {Value, useCode, cond, lessOrEq, or, eq, call, set, neq} = Animated;

export default React.forwardRef(
  (
    {
      highest = 0, // 0 it the highest snap point and
      lowest = 1, // 1 is the lowest (from `reanimated-bottom-sheet` docs).
      callbackThreshold = 0.01,
      callbackNode = useRef(new Value(1)).current,
      onOpenStart,
      onOpenEnd,
      onCloseStart,
      onCloseEnd,
      sheetRef,
      onClose,
      snapPoints,
      ...rest
    },
    ref,
  ) => {
    const bottomTippingPoint = lowest - callbackThreshold;
    const topTippingPoint = highest + callbackThreshold;
    const animDirection = useRef(new Value(0)).current;
    const animLastFired = useRef(new Value(0)).current;

    // Prevent the onCloseEnd firing onMount #fix
    const isCloseEndAllowed = useRef(false);
    function handleOpenStart() {
      isCloseEndAllowed.current = true;
      if (onOpenStart) onOpenStart();
    }
    function handleCloseEnd() {
      if (!isCloseEndAllowed.current) return;
      if (onCloseEnd) onCloseEnd();
    }

    useCode(
      () =>
        cond(
          lessOrEq(callbackNode, bottomTippingPoint),

          cond(
            lessOrEq(callbackNode, topTippingPoint),
            // onOpenEnd
            cond(
              or(eq(animDirection, 0), eq(animLastFired, topTippingPoint)),
              call([set(animDirection, 1), set(animLastFired, 0)], () => onOpenEnd && onOpenEnd()),
            ),
            cond(
              eq(animDirection, 1),
              // onCloseStart
              cond(
                neq(animLastFired, topTippingPoint),
                call([set(animLastFired, topTippingPoint)], () => onCloseStart && onCloseStart()),
              ),
              // onOpenStart
              cond(
                neq(animLastFired, bottomTippingPoint),
                call([set(animLastFired, bottomTippingPoint)], handleOpenStart),
              ),
            ),
          ),

          // onCloseEnd
          cond(
            or(eq(animDirection, 1), eq(animLastFired, bottomTippingPoint)),
            call([set(animDirection, 0), set(animLastFired, 1)], handleCloseEnd),
          ),
        ),
      [callbackNode],
    );

    return (
      <BottomSheet
        {...{callbackNode, callbackThreshold, ...rest}}
        ref={sheetRef}
        snapPoints={[snapPoints || '50%', 0]}
        initialSnap={1}
        enabledBottomInitialAnimation={true}
        enabledGestureInteraction={true}
        enabledContentTapInteraction={true}
      />
    );
  },
);

// import React from 'react';
// import BottomSheet from 'reanimated-bottom-sheet';

// const BottomSheetComponent = ({sheetRef, onClose, renderContent, snapPoints, onOpenEnd, onOpenStart, onCloseStart}) => (
//   <BottomSheet
//     ref={sheetRef}
//     snapPoints={[snapPoints || '50%', 0]}
//     renderContent={renderContent}
//     initialSnap={1}
//     onOpenStart={onOpenStart}
//     onOpenEnd={onOpenEnd}
//     onCloseEnd={() => onClose(false)}
//     onCloseStart={onCloseStart}
//     enabledBottomInitialAnimation={true}
//     enabledGestureInteraction={true}
//     enabledContentTapInteraction={true}
//   />
// );

// export default BottomSheetComponent;
