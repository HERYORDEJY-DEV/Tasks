import { Button, Center, Text, View } from 'native-base';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { StyleSheet } from 'react-native';

const myErrorHandler = (error: Error) => {
  // Do something with the error
  // E.g. reporting errorr using sentry ( see part 3)
};

function ErrorFallback({ resetErrorBoundary }: { resetErrorBoundary: any }) {
  return (
    <View style={[styles.container]}>
      <Center>
        <Text fontSize={30} textAlign={'center'}>
          Something went wrong:
        </Text>
        <Button onPress={resetErrorBoundary}>Try again</Button>
      </Center>
    </View>
  );
}
export default function ErrorHandler({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
      {children}
    </ErrorBoundary>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 12,
  },
});
