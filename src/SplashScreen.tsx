import {
  Button,
  Fade,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap";

interface SplashScreenProps {
  showSplash: boolean;
  setShowSplash: any;
}
const SplashScreen = ({ showSplash, setShowSplash }: SplashScreenProps) => {
  return (
    <Fade in={showSplash}>
      <div className="App">
        <Row className="align-items-center" style={{ height: "80vh" }}>
          <Card className="w-50 mx-auto">
            <CardBody>
              <CardTitle>
                <h4>You are trying to download a PDF</h4>
              </CardTitle>
              <CardSubtitle className="text-muted">
                <h6>Its pretty dificult</h6>
              </CardSubtitle>
              <CardText>
                The server will hold you spot in the download queue for
                <b>5 minutes</b> while you fille out the required forms.
              </CardText>
              <CardText>
                Can you complete the forms and maintain your sanity?
              </CardText>
              <Fade timeout={2000}>
                <Button color="primary" onClick={() => setShowSplash(false)}>
                  Start
                </Button>
              </Fade>
            </CardBody>
          </Card>
        </Row>
      </div>
    </Fade>
  );
};

export default SplashScreen;
